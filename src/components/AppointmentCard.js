import React from "react";
import { Check, X } from "lucide-react";
import moment from "moment";
import "moment/locale/it"; // Importa la localizzazione italiana
import { useDispatch, useSelector } from "react-redux";
import { deleteAppuntamento, toggleCompletato } from "../store";
import { toast } from "react-toastify";

const AppointmentCard = ({ id, data, oraInizio, oraFine, descrizione }) => {
  moment.locale("it"); // Imposta la localizzazione italiana
  const dispatch = useDispatch();

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

  return (
    <div
      className="rounded-lg shadow-md p-4 mb-6 flex flex-col md:flex-row justify-between  relative bg-white transition duration-300 ease-in-out hover:shadow-lg
    "
    >
      <div
        className="border-b-2 md:border-b-0
       md:border-r-2 border-gray-200 pr-2 md:pr-6 pb-4 md:pb-0 flex flex-row md:flex-col justify-between"
      >
        <div className="flex md:flex-row ">
          <h3 className="text-3xl font-semibold mr-1 text-blue-800">
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
        <p
          className="text-sm text-gray-600 font-semibold mt-1 leading-none text-blue-500 
        "
        >
          {oraInizio} - {oraFine}
        </p>
      </div>
      <div className=" w-full ml-0 md:ml-6 pt-4 md:pt-0">
        <p
          className={`text-gray-800 ${
            completato ? "line-through" : ""
          } text-lg`}
        >
          <div className="flex flex-row items-center">
            <div
              className="w-5 h-5 flex justify-center items-center rounded-full bg-red-100 cursor-pointer hover:bg-red-200 transition duration-300 ease-in-out mr-2"
              onClick={handleCompletatoToggle}
            >
              <span
                className={`block rounded-full w-5 h-5 flex items-center justify-center
                 ${
                   completato
                     ? "bg-green-600 border-2 border-green-600"
                     : "bg-gray-200 border-2 border-blue-400"
                 }`}
              >
                {completato ? (
                  <Check strokeWidth={2} size={12} className="text-white" />
                ) : null}
              </span>
            </div>
            <span className="font-semibold text-gray-800 ">{descrizione}</span>
          </div>
        </p>
      </div>
      <div></div>
      <div className="flex items-center absolute right-2 top-2 ">
        <div className="w-4 h-4 flex justify-center items-center rounded-full bg-red-100 cursor-pointer hover:bg-red-200 transition duration-300 ease-in-out ml-2">
          <X
            strokeWidth={3}
            className="text-red-500 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
