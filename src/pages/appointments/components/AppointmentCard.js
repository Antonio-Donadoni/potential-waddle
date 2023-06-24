import React, { useState } from "react";
import { Check, X, Trash2, Edit } from "lucide-react";
import moment from "moment";
import "moment/locale/it"; // Importa la localizzazione italiana
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import DeletePopup from "../../../components/DeletePopup";
import {
  deleteAppointment,
  updateAppointment,
} from "../../../features/appointmentsSlice";
import NewAppointmentSection from "./NewAppointmentSection";

const AppointmentCard = ({
  id,
  data,
  titolo,
  descrizione,
  tipo,
  user,
  appuntamento,
  isAdmin,
}) => {
  moment.locale("it");
  const dispatch = useDispatch();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showEditOwner, setShowEditOwner] = useState(false);
  const [owner, setOwner] = useState(user._id);

  const users = useSelector((state) => state.users.data);

  const completato = useSelector(
    (state) =>
      state.appuntamenti?.data.find((appuntamento) => appuntamento._id === id)
        ?.completato
  );

  const handleDelete = () => {
    dispatch(deleteAppointment(id));
    toast.success("Appuntamento eliminato!");
  };

  const handleCompletatoToggle = () => {
    dispatch(
      updateAppointment({
        id,
        updateData: {
          completato: !completato,
        },
      })
    );
    toast.success("Appuntamento aggiornato!");
  };

  const handleOwnerChange = () => {
    dispatch(
      updateAppointment({
        id,
        updateData: {
          user: owner,
        },
      })
    );
    toast.success("Appuntamento aggiornato!");
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
          text={"Sei sicuro di voler eliminare questo appuntamento?"}
        />
      )}
      {!!showEditPopup && (
        <NewAppointmentSection
          onClose={() => setShowEditPopup(false)}
          isEditing={true}
          appuntamentoToUpdate={appuntamento}
        />
      )}
      <div
        className={`border-b-2 md:border-b-0
       md:border-r-2 ${
         completato ? getColorClass().borderChecked : getColorClass().border
       } 
        pr-2 md:pr-4 pb-4 pt-2 md:pt-0 md:pb-0 flex flex-row md:flex-col justify-between`}
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
          <div className="flex flex-row items-center ">
            <p
              className={` text-sm ${
                completato ? " text-gray-500" : "text-gray-800"
              }`}
            >
              Assegnato a {}
            </p>
            {!!showEditOwner ? (
              <>
                <div className="flex flex-row items-center">
                  <select
                    className={`border-2 ${
                      completato
                        ? getColorClass().borderChecked
                        : getColorClass().border
                    } rounded-lg p-1 ml-2 text-sm bg-transparent focus:outline-none`}
                    onChange={(e) => {
                      setOwner(e.target.value);
                    }}
                    value={owner}
                  >
                    {users.map((u) => (
                      <option value={u._id}>{u.nome + " " + u.cognome}</option>
                    ))}
                  </select>
                  <Check
                    strokeWidth={3}
                    size={18}
                    className="bg-green-800 text-white rounded-full p-1
                     cursor-pointer ml-2 hover:scale-110 transform transition duration-300 ease-in-out"
                    onClick={() => {
                      setShowEditOwner(false);
                      handleOwnerChange();
                    }}
                  />

                  <X
                    strokeWidth={3}
                    size={18}
                    className="bg-red-800 text-white rounded-full p-1
                     cursor-pointer ml-2 hover:scale-110 transform transition duration-300 ease-in-out"
                    onClick={() => setShowEditOwner(false)}
                  />
                </div>
              </>
            ) : (
              <>
                <span
                  className={`font-semibold ml-1 text-sm ${
                    completato ? " text-gray-500" : "text-gray-800"
                  }`}
                >
                  {user.nome + " " + user.cognome}
                </span>
                {!!isAdmin && (
                  <Edit
                    strokeWidth={3}
                    size={18}
                    className="text-blue-800 cursor-pointer ml-2 hover:scale-110 transform transition duration-300 ease-in-out"
                    onClick={() => setShowEditOwner(true)}
                  />
                )}
              </>
            )}
          </div>
        </p>
      </div>

      {
        //  EDIT BUTTON
      }
      <div className="flex items-center absolute md:right-8 md:top-2 pb-2 right-6 top-1 ">
        <div className="w-4 h-4 flex justify-center items-center cursor-pointer ml-2 hover:scale-110 transform transition duration-300 ease-in-out ">
          <Edit
            strokeWidth={3}
            className="text-blue-800 cursor-pointer"
            onClick={() => setShowEditPopup(true)}
          />
        </div>
      </div>
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
