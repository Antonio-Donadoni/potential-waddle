import "./App.css";

import React, { useEffect, useState } from "react";
import AppointmentCard from "./components/AppointmentCard";
import { useDispatch, useSelector } from "react-redux";
import { setAppuntamenti } from "./store";
import NewAppointmentSection from "./components/NewAppointmentSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Search } from "lucide-react";
import Navbar from "./components/Navbar";
import CurrentWeekDays from "./components/CurrentWeekDays";
import moment from "moment";

const defaultAppuntamenti = [
  {
    id: 1,
    data: "2023/06/11 10:00",
    titolo: "Presentazione progetto finale ",
    descrizione:
      "Presentazione progetto finale per corso React JS presso Web Agency SRL",
    completato: true,
    tipo: "Lavoro",
  },
  {
    id: 2,
    data: "2023/06/10 14:00",
    titolo: "Visita medica",
    descrizione: "Sede: Ospedale San Raffaele - Milano - Piano 2",
    completato: false,
    tipo: "Salute",
  },
  {
    id: 3,
    data: "2023/06/10 16:00",
    titolo: "Appuntamento con avvocato",
    descrizione: "Consulenza legale presso studio avvocato",
    completato: false,
    tipo: "Lavoro",
  },
];

const App = () => {
  const dispatch = useDispatch();
  const appuntamenti = useSelector((state) => state.appuntamenti);

  const [searchTerm, setSearchTerm] = useState("");
  const [isNewAppointmentSectionOpen, setIsNewAppointmentSectionOpen] =
    useState(false);
  const [selectedDay, setSelectedDay] = useState(moment());

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
            <h1
              className="text-3xl font-bold text-blue-800  
          "
            >
              I miei appuntamenti
            </h1>
            <div className="flex flex-row items-center">
              <button
                className="bg-blue-800 text-white px-4 py-2 rounded-lg mr-2"
                onClick={() =>
                  setIsNewAppointmentSectionOpen(!isNewAppointmentSectionOpen)
                }
              >
                {"Nuovo appuntamento"}
              </button>
              <Search className="mr-2" size={24} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cerca appuntamento"
                className="px-4 py-2 border border-gray-300 rounded-lg "
              />
            </div>
          </div>
          <CurrentWeekDays
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />

          {appuntamenti
            .filter((appuntamento) => {
              if (searchTerm === "") {
                return moment(appuntamento.data, "YYYY/MM/DD HH:mm").isSame(
                  selectedDay,
                  "day"
                );
              } else if (
                appuntamento.descrizione
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                appuntamento.titolo
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return appuntamento;
              }
            })
            .map((appuntamento) => (
              <AppointmentCard
                id={appuntamento.id}
                key={appuntamento.id}
                data={appuntamento.data}
                titolo={appuntamento.titolo}
                descrizione={appuntamento.descrizione}
                completato={appuntamento.completato}
                tipo={appuntamento.tipo}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
