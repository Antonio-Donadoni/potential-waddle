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

const defaultAppuntamenti = [
  {
    id: 1,
    data: "06/02/2023",
    oraInizio: "10:00",
    oraFine: "11:30",
    descrizione: "Appuntamento 1",
    completato: true,
  },
  {
    id: 2,
    data: "06/02/2023",
    oraInizio: "14:30",
    oraFine: "15:30",
    descrizione: "Appuntamento 2",
    completato: false,
  },
  {
    id: 3,
    data: "06/04/2023",
    oraInizio: "09:00",
    oraFine: "10:00",
    descrizione: "Appuntamento 3",
    completato: false,
  },
];

const App = () => {
  const dispatch = useDispatch();
  const appuntamenti = useSelector((state) => state.appuntamenti);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedAppuntamenti = localStorage.getItem("appuntamenti");
    if (storedAppuntamenti) {
      const parsedAppuntamenti = JSON.parse(storedAppuntamenti);
      dispatch(setAppuntamenti(parsedAppuntamenti));
    } else {
      console.log("No appuntamenti found in local storage");
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
          <NewAppointmentSection appuntamenti={appuntamenti} />

          <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b-2 border-blue-800 pb-2">
            <h1
              className="text-3xl font-bold text-blue-800  
          "
            >
              I miei appuntamenti
            </h1>
            <div className="flex flex-row items-center">
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
          {appuntamenti
            .filter((appuntamento) => {
              if (searchTerm === "") {
                return appuntamento;
              } else if (
                appuntamento.descrizione
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
                oraInizio={appuntamento.oraInizio}
                oraFine={appuntamento.oraFine}
                descrizione={appuntamento.descrizione}
                completato={appuntamento.completato}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
