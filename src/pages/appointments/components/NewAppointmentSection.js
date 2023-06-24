import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import {
  createNewAppointment,
  updateAppointment,
} from "../../../features/appointmentsSlice";

const inputArray = [
  {
    name: "data",
    type: "datetime-local",
    placeholder: "Data ",
  },
  {
    name: "titolo",
    type: "text",
    placeholder: "Titolo",
  },
  {
    name: "descrizione",
    type: "text",
    placeholder: "Descrizione",
  },
  {
    name: "tipo",
    type: "select",
    placeholder: "Tipologia",
    options: ["Lavoro", "Salute", "Svago"],
  },
];

const NewAppointmentSection = ({
  appuntamenti,
  onClose,
  isEditing,
  appuntamentoToUpdate,
}) => {
  const dispatch = useDispatch();
  const [nuovoAppuntamento, setNuovoAppuntamento] = useState({
    data: "",
    titolo: "",
    descrizione: "",
    tipo: "",
  });

  useEffect(() => {
    if (isEditing && appuntamentoToUpdate) {
      setNuovoAppuntamento({
        data: new Date(appuntamentoToUpdate.data).toISOString().slice(0, 16),
        titolo: appuntamentoToUpdate.titolo,
        descrizione: appuntamentoToUpdate.descrizione,
        tipo: appuntamentoToUpdate.tipo,
      });
    }
  }, [isEditing, appuntamentoToUpdate]);

  const handleChangeNuovoAppuntamento = (e) => {
    const { name, value } = e.target;
    setNuovoAppuntamento((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAction = () => {
    if (isEditing && appuntamentoToUpdate) {
      // Logica per l'aggiornamento dell'appuntamento
      const appuntamentoModificato = {
        ...nuovoAppuntamento,
      };
      dispatch(
        updateAppointment({
          id: appuntamentoToUpdate._id,
          updateData: appuntamentoModificato,
        })
      );
      toast.success("Appuntamento aggiornato con successo!");
    } else {
      // Logica per la creazione di un nuovo appuntamento
      const nuovoId = Math.max(...appuntamenti.map((a) => a.id), 0) + 1;
      const nuovoAppuntamentoFormatted = {
        id: nuovoId,
        ...nuovoAppuntamento,
        completato: false,
      };
      dispatch(createNewAppointment(nuovoAppuntamentoFormatted));
      toast.success("Appuntamento aggiunto con successo!");
    }

    onClose();
    setNuovoAppuntamento({
      data: "",
      titolo: "",
      descrizione: "",
      tipo: "",
    });
  };

  return (
    <div>
      <div
        className="p-4 border-b bg-blue-800
      "
      >
        <h2
          className="text-xl  text-white letter-spacing-2
        "
        >
          {!!isEditing
            ? "Modifica appuntamento"
            : "Aggiungi un nuovo appuntamento"}
        </h2>
      </div>
      <div
        className="grid grid-cols-1
       md:grid-cols-2 gap-4 p-4"
      >
        {inputArray.map((input) => (
          <div key={input.name}>
            <label
              htmlFor={input.name}
              className="block text-gray-700 font-bold mb-1"
            >
              {input.placeholder}
            </label>
            {input.type === "select" ? (
              <select
                id={input.name}
                name={input.name}
                value={nuovoAppuntamento[input.name]}
                onChange={handleChangeNuovoAppuntamento}
                className="w-full p-2 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="">Seleziona una tipologia</option>
                {input.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={input.type}
                id={input.name}
                name={input.name}
                value={nuovoAppuntamento[input.name]}
                onChange={handleChangeNuovoAppuntamento}
                placeholder={input.placeholder}
                className="w-full p-2 mb-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            )}
          </div>
        ))}
      </div>
      <div
        className=" flex justify-end p-4
      "
      >
        <button
          onClick={handleAction}
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            !nuovoAppuntamento.data ||
            !nuovoAppuntamento.titolo ||
            !nuovoAppuntamento.tipo
          }
        >
          {!!isEditing ? "Modifica Appuntamento" : "Aggiungi Appuntamento"}
        </button>
      </div>
    </div>
  );
};

const NewAppointmentPopup = ({
  appuntamenti,
  onClose,
  appuntamentoToUpdate,
  isEditing,
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10 
    "
    >
      <div
        className="bg-white rounded shadow-lg w-full h-full md:h-auto
       md:w-1/2
       relative z-20 overflow-y-auto align-middle justify-center"
      >
        <NewAppointmentSection
          appuntamenti={appuntamenti}
          onClose={onClose}
          appuntamentoToUpdate={appuntamentoToUpdate}
          isEditing={isEditing}
        />
        <X
          size={20}
          onClick={onClose}
          className=" 
        absolute top-5 right-4 cursor-pointer text-white hover:text-gray-300 transition duration-200 ease-in-out
      "
        />
      </div>
    </div>
  );
};

export default NewAppointmentPopup;
