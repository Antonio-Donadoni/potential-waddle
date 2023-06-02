import logo from "./logo.svg";
import "./App.css";

import React from "react";
import AppointmentCard from "./components/AppointmentCard";

const App = () => {
  const appuntamenti = [
    { id: 1, data: "02/06/2023", ora: "10:00", descrizione: "Appuntamento 1" },
    { id: 2, data: "02/06/2023", ora: "14:30", descrizione: "Appuntamento 2" },
    { id: 3, data: "03/06/2023", ora: "09:00", descrizione: "Appuntamento 3" },
  ];

  return (
    <>
      <div className="container mx-auto">
        <h1
          className="text-3xl font-bold underline center text-blue-500
      "
        >
          Lista Appuntamenti
        </h1>
        {appuntamenti.map((appuntamento) => (
          <AppointmentCard
            key={appuntamento.id}
            data={appuntamento.data}
            ora={appuntamento.ora}
            descrizione={appuntamento.descrizione}
          />
        ))}
      </div>
    </>
  );
};

export default App;
