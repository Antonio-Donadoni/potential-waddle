import React, { useEffect, useMemo, useState } from "react";
import AppointmentCard from "./components/AppointmentCard";
import { useDispatch, useSelector } from "react-redux";
import NewAppointmentSection from "./components/NewAppointmentSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilterIcon, FilterXIcon, PlusCircle, Search } from "lucide-react";
import Navbar from "../../components/Navbar";
import CurrentWeekDays from "./components/CurrentWeekDays";
import moment from "moment";
// import defaultAppuntamenti from "./defaultAppuntamenti";
import FilterSection from "./components/FilterSection";
import { getAllAppointments } from "../../features/appointmentsSlice";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../features/usersSlice";
// import { getAllUsers } from "../features/usersReducer";

const AppointmentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appuntamenti = useSelector((state) => state.appuntamenti.data);
  const authToken = localStorage.getItem("authToken");
  const profile = useSelector((state) => state.account?.profile);
  const isAdmin = profile?.ruolo === "admin";

  const [searchTerm, setSearchTerm] = useState("");
  const [isNewAppointmentSectionOpen, setIsNewAppointmentSectionOpen] =
    useState(false);
  const [selectedDay, setSelectedDay] = useState(moment());
  const [filterSectionOpen, setFilterSectionOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    svago: true,
    lavoro: true,
    salute: true,
    completato: true,
    nonCompletato: true,
  });
  const [appuntamentiOggi, setAppuntamentiOggi] = useState(0);
  const [appuntamentiOggiCompletati, setAppuntamentiOggiCompletati] =
    useState(0);
  const [appuntamentiOggiNonCompletati, setAppuntamentiOggiNonCompletati] =
    useState(0);

  useEffect(() => {
    if (authToken) {
      dispatch(getAllAppointments());
    } else {
      navigate("/login");
    }
  }, [authToken, dispatch]);

  useEffect(() => {
    if (!!isAdmin) {
      dispatch(getAllUsers());
    }
  }, [isAdmin]);

  useEffect(() => {
    if (appuntamenti.length > 0) {
      setAppuntamentiOggi(
        appuntamenti?.filter((appuntamento) =>
          moment(appuntamento.data).isSame(selectedDay, "day")
        ).length
      );
      setAppuntamentiOggiCompletati(
        appuntamenti?.filter(
          (appuntamento) =>
            moment(appuntamento.data).isSame(selectedDay, "day") &&
            appuntamento.completato
        ).length
      );
      setAppuntamentiOggiNonCompletati(
        appuntamenti?.filter(
          (appuntamento) =>
            moment(appuntamento.data).isSame(selectedDay, "day") &&
            !appuntamento.completato
        ).length
      );
    }
  }, [appuntamenti, selectedDay]);

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen ">
      <Navbar />
      <div
        className=" px-4 sm:px-6 lg:px-8 py-8 
    "
      >
        <ToastContainer />
        <div className="container mx-auto">
          {!!isNewAppointmentSectionOpen && (
            <NewAppointmentSection
              appuntamenti={appuntamenti}
              onClose={() => setIsNewAppointmentSectionOpen(false)}
            />
          )}

          <div
            className={`flex flex-col md:flex-row justify-between items-center mb-6 ${
              filterSectionOpen ? "border-b-0" : "border-b-2  pb-2"
            } border-blue-800`}
          >
            <div className="flex flex-row md:items-center w-full">
              <h1
                className="text-xl md:text-3xl font-bold text-blue-800  
          "
              >
                I miei appuntamenti
              </h1>
              <button
                className=" ml-4 flex flex-row items-center text-blue-800 font-semibold"
                onClick={() =>
                  setIsNewAppointmentSectionOpen(!isNewAppointmentSectionOpen)
                }
              >
                <PlusCircle className="mr-2" size={24} />
                {"Nuovo appuntamento"}
              </button>
            </div>
            <div className="flex flex-row items-center justify-between md:justify-end w-full mt-2 md:mt-0">
              <div className="flex flex-row items-center ">
                <Search className="mr-2" size={24} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cerca"
                  className="px-4 py-2 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                />
              </div>
              <button
                className={`mr-2 flex items-center text-gray-600 font-semibold ${
                  filterSectionOpen ? "text-blue-800" : ""
                }`}
                onClick={() => setFilterSectionOpen(!filterSectionOpen)}
              >
                {filterSectionOpen ? (
                  <FilterXIcon className="mr-1" size={24} color="#1d4ed8" />
                ) : (
                  <FilterIcon className="mr-1" size={24} />
                )}
                Filtra
              </button>
            </div>
          </div>
          {!!filterSectionOpen && (
            <FilterSection
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
            />
          )}
          {!searchTerm && appuntamenti.length > 0 && (
            <CurrentWeekDays
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          )}
          {appuntamentiOggi > 0 && (
            <p
              className="text-gray-600 text-sm 
          "
            >
              Hai <b className="text-blue-800 text-lg">{appuntamentiOggi}</b>{" "}
              appuntamenti fissati per questo giornata
            </p>
          )}

          <p
            className="text-gray-600 text-sm mb-4
          "
          >
            ({appuntamentiOggiCompletati} completati{" / "}
            {appuntamentiOggiNonCompletati} da completare)
          </p>

          {appuntamenti?.length > 0 &&
            appuntamenti
              .filter((appuntamento) => {
                const isSameDay = moment(
                  appuntamento.data,
                  "YYYY/MM/DD HH:mm"
                ).isSame(selectedDay, "day");

                const containsSearchTerm =
                  appuntamento.descrizione
                    ?.toLowerCase()
                    ?.includes(searchTerm.toLowerCase()) ||
                  appuntamento.titolo
                    ?.toLowerCase()
                    ?.includes(searchTerm.toLowerCase());

                const isTipoMatched =
                  (filterOptions.svago && appuntamento.tipo === "Svago") ||
                  (filterOptions.lavoro && appuntamento.tipo === "Lavoro") ||
                  (filterOptions.salute && appuntamento.tipo === "Salute");

                const isCompletatoMatched =
                  (filterOptions.completato && appuntamento.completato) ||
                  (filterOptions.nonCompletato && !appuntamento.completato);

                if (searchTerm === "") {
                  return (
                    isTipoMatched &&
                    (isCompletatoMatched ||
                      (filterOptions.completato &&
                        filterOptions.nonCompletato)) &&
                    isSameDay
                  );
                } else {
                  return (
                    containsSearchTerm &&
                    isTipoMatched &&
                    (isCompletatoMatched ||
                      (filterOptions.completato && filterOptions.nonCompletato))
                    //      &&
                    // isSameDay
                  );
                }
              })

              .map((appuntamento) => (
                <AppointmentCard
                  id={appuntamento._id}
                  key={appuntamento._id}
                  data={appuntamento.data}
                  titolo={appuntamento.titolo}
                  descrizione={appuntamento.descrizione}
                  completato={appuntamento?.completato}
                  tipo={appuntamento.tipo}
                  user={appuntamento.user}
                  appuntamento={appuntamento}
                  isAdmin={isAdmin}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
