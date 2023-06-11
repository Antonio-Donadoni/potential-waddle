import React, { useState } from "react";
import { Check, X, Trash2 } from "lucide-react";
import moment from "moment";
import "moment/locale/it"; // Importa la localizzazione italiana
import { useDispatch, useSelector } from "react-redux";
import { deleteAppuntamento, toggleCompletato } from "../store";
import { toast } from "react-toastify";
import DeletePopup from "./DeletePopup";

const AppointmentCard = ({ id, data, titolo, descrizione, tipo }) => {
  moment.locale("it"); // Imposta la localizzazione italiana
  const dispatch = useDispatch();
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const completato = useSelector(
    (state) =>
      state.appuntamenti.find((appuntamento) => appuntamento.id === id)
        ?.completato
  );

  const handleDelete = () => {
    dispatch(deleteAppuntamento(id));
    toast.success("Appuntamento eliminato!");
  };

  const handleCompletatoToggle = () => {
    dispatch(toggleCompletato(id));
  };

  // colori diversi per le tipologie
  const getColorClass = () => {
    switch (tipo) {
      case "Lavoro":
        return {
          bg: "bg-orange-200",
          text: "text-orange-600",
          lighText: "text-orange-400",
          border: "border-orange-200",
          borderChecked: "border-orange-600",
          unchecked: "bg-orange-200 border-orange-400",
          checked: "bg-orange-400 border-orange-600",
        };
      case "Salute":
        return {
          bg: "bg-green-200",
          text: "text-green-600",
          lighText: "text-green-400",
          border: "border-green-200",
          borderChecked: "border-green-600",
          unchecked: "bg-green-200 border-green-400",
          checked: "bg-green-400 border-green-600",
        };

      case "Svago":
        return {
          bg: "bg-purple-200",
          text: "text-purple-800",
          lighText: "text-purple-400",
          border: "border-purple-200",
          borderChecked: "border-purple-600",
          unchecked: "bg-purple-200 border-purple-400",
          checked: "bg-purple-400 border-purple-600",
        };
      default: {
        return {
          bg: "bg-gray-200",
          text: "text-gray-800",
          lighText: "text-gray-400",
          border: "border-gray-200",
          borderChecked: "border-gray-600",
          unchecked: "bg-gray-200 border-gray-400",
          checked: "bg-gray-400 border-gray-600",
        };
      }
    }
  };

  return (
    <div
      className={`rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row justify-between  relative  transition duration-300 ease-in-out hover:shadow-xl border-l-4 ${
        completato ? getColorClass().bg : "bg-white"
      } ${
        completato ? getColorClass().borderChecked : getColorClass().border
      } `}
    >
      {!!showDeletePopup && (
        <DeletePopup
          setShowDeletePopup={setShowDeletePopup}
          handleDelete={handleDelete}
        />
      )}
      <div
        className={`border-b-2 md:border-b-0
       md:border-r-2 ${
         completato ? getColorClass().borderChecked : getColorClass().border
       } 
        pr-2 md:pr-4 pb-4 md:pb-0 flex flex-row md:flex-col justify-between`}
      >
        <div className="flex md:flex-row ">
          <h3 className={`text-3xl font-semibold mr-1 ${getColorClass().text}`}>
            {moment(data).format("DD")}
          </h3>
          <div
            className="flex flex-col justify-center mt-1
          
          "
          >
            <p
              className="
              font-semibold text-gray-600 uppercase tracking-wider text-xs leading-none 
            "
            >
              {moment(data).format("MMMM")}
            </p>
            <p
              className="
              font-semibold text-gray-600 uppercase tracking-wider text-xs leading-none"
            >
              {moment(data).format("YYYY")}
            </p>
          </div>
        </div>
        <div>
          <p
            className={`font-semibold leading-none text-md text-gray-600 
          }
        `}
          >
            {"Ore " + moment(data).format("HH:mm")}
          </p>
          <p
            className={`font-semibold leading-none uppercase p-1 rounded-lg
           ${getColorClass().bg} text-sm ${
              getColorClass().text
            } text-center md:mt-2
        `}
          >
            {tipo}
          </p>
        </div>
      </div>
      <div className=" w-full ml-0 md:ml-6 pt-4 md:pt-0">
        <p className={`text-lg`}>
          <div className="flex flex-row items-center">
            <div
              className="w-5 h-5 flex justify-center items-center rounded-full bg-red-100 cursor-pointer hover:bg-red-200 transition duration-300 ease-in-out mr-2"
              onClick={handleCompletatoToggle}
            >
              <span
                className={`block rounded-full w-5 h-5 flex items-center justify-center
                 ${
                   completato
                     ? `border-2 ${getColorClass().checked}`
                     : ` border-2 ${getColorClass().unchecked}`
                 }`}
              >
                {completato ? (
                  <Check strokeWidth={2} size={12} className="text-white" />
                ) : null}
              </span>
            </div>
            <span
              className={`font-semibold  ${
                completato ? " text-gray-500" : "text-gray-800"
              } `}
            >
              {titolo}
            </span>
          </div>
          <div className="mt-1">
            <p
              className={` text-sm ${
                completato ? " text-gray-500" : "text-gray-800"
              }`}
            >
              {descrizione}
            </p>
          </div>
        </p>
      </div>
      <div></div>
      <div className="flex items-center absolute md:right-2 md:top-2  right-1 top-1 ">
        <div className="w-4 h-4 flex justify-center items-center cursor-pointer ml-2 hover:scale-110 transform transition duration-300 ease-in-out ">
          <Trash2
            strokeWidth={3}
            className="text-blue-800 cursor-pointer"
            onClick={() => setShowDeletePopup(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
