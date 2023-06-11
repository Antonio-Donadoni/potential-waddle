import "./App.css";

import React, { useEffect, useState } from "react";
import AppointmentCard from "./components/AppointmentCard";
import { useDispatch, useSelector } from "react-redux";
import { setAppuntamenti } from "./store";
import NewAppointmentSection from "./components/NewAppointmentSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilterIcon, PlusCircle, Search } from "lucide-react";
import Navbar from "./components/Navbar";
import CurrentWeekDays from "./components/CurrentWeekDays";
import moment from "moment";
import defaultAppuntamenti from "./defaultAppuntamenti";
import FilterSection from "./components/FilterSection";

const App = () => {
  const dispatch = useDispatch();
  const appuntamenti = useSelector((state) => state.appuntamenti);

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
  console.log("appuntamenti", appuntamenti[0]?.completato);

  useEffect(() => {
    const storedAppuntamenti = localStorage.getItem("appuntamenti");
    if (storedAppuntamenti) {
      const parsedAppuntamenti = JSON.parse(storedAppuntamenti);
      dispatch(setAppuntamenti(parsedAppuntamenti));
    } else {
      const parsedDefaultAppuntamenti = JSON.parse(
        JSON.stringify(defaultAppuntamenti)
      );
      dispatch(setAppuntamenti(parsedDefaultAppuntamenti));
    }
  }, []);

  useEffect(() => {
    if (!!appuntamenti) {
      localStorage.setItem("appuntamenti", JSON.stringify(appuntamenti));
    }
  }, [appuntamenti]);

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

          <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b-2 border-blue-800 pb-2">
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
                <FilterIcon className="mr-1" size={24} />
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
          {!searchTerm && (
            <CurrentWeekDays
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          )}

          {appuntamenti?.length > 0 &&
            appuntamenti
              .filter((appuntamento) => {
                const isSameDay = moment(
                  appuntamento.data,
                  "YYYY/MM/DD HH:mm"
                ).isSame(selectedDay, "day");

                const containsSearchTerm =
                  appuntamento.descrizione
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  appuntamento.titolo
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

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
                  id={appuntamento.id}
                  key={appuntamento.id}
                  data={appuntamento.data}
                  titolo={appuntamento.titolo}
                  descrizione={appuntamento.descrizione}
                  completato={appuntamento?.completato}
                  tipo={appuntamento.tipo}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default App;
