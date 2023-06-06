import React, { useState } from "react";
import { addAppuntamento } from "../store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const inputArray = [
  {
    name: "data",
    type: "datetime-local",
    placeholder: "Data (es. 06/05/2023)",
  },
  {
    name: "oraInizio",
    type: "datetime-local",
    placeholder: "Ora inizio (es. 10:00)",
  },
  {
    name: "oraFine",
    type: "datetime-local",
    placeholder: "Ora fine (es. 11:00)",
  },
  {
    name: "descrizione",
    type: "text",
    placeholder: "Descrizione",
  },
];

const NewAppointmentSection = ({ appuntamenti }) => {
  const dispatch = useDispatch();
  const [nuovoAppuntamento, setNuovoAppuntamento] = useState({
    data: "",
    oraInizio: "",
    oraFine: "",
    descrizione: "",
  });

  const handleChangeNuovoAppuntamento = (e) => {
    const { name, value } = e.target;
    setNuovoAppuntamento((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddAppuntamento = () => {
    const nuovoId = Math.max(...appuntamenti.map((a) => a.id), 0) + 1;

    const nuovoAppuntamentoFormatted = {
      id: nuovoId,
      ...nuovoAppuntamento,
      completato: false,
    };

    dispatch(addAppuntamento(nuovoAppuntamentoFormatted));
    toast.success("Appuntamento aggiunto con successo!");

    setNuovoAppuntamento({
      data: "",
      oraInizio: "",
      oraFine: "",
      descrizione: "",
    });
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2 text-blue-800">
        Aggiungi un nuovo appuntamento
      </h2>
      {inputArray.map((input) => (
        <input
          type={input.type}
          name={input.name}
          value={nuovoAppuntamento[input.name]}
          onChange={handleChangeNuovoAppuntamento}
          placeholder={input.placeholder}
          className="p-2 mb-2 rounded border"
        />
      ))}
      <button
        onClick={handleAddAppuntamento}
        className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={
          !nuovoAppuntamento.data ||
          !nuovoAppuntamento.oraInizio ||
          !nuovoAppuntamento.oraFine ||
          !nuovoAppuntamento.descrizione
        }
      >
        Aggiungi Appuntamento
      </button>
    </div>
  );
};

export default NewAppointmentSection;
