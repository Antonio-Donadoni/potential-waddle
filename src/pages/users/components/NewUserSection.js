import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { createNewAppointment } from "../../../features/appointmentsSlice";
import { createNewUser, updateUser } from "../../../features/usersSlice";

const inputArray = [
  {
    name: "email",
    type: "text",
    placeholder: "Email",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
  {
    name: "username",
    type: "text",
    placeholder: "Username",
  },
  {
    name: "ruolo",
    type: "select",
    placeholder: "Ruolo",
    options: ["Admin", "User"],
  },
  {
    name: "nome",
    type: "text",
    placeholder: "Nome",
  },
  {
    name: "cognome",
    type: "text",
    placeholder: "Cognome",
  },
  {
    name: "genere",
    type: "select",
    placeholder: "Genere",
    options: ["M", "F", "Altro"],
  },
  {
    name: "azienda",
    type: "text",
    placeholder: "Azienda",
  },
];

const NewUserSection = ({ appuntamenti, onClose, existingUser }) => {
  const dispatch = useDispatch();
  const [nuovoUtente, setNuovoUtente] = useState({
    email: "",
    password: "",
    username: "",
    ruolo: "",
    nome: "",
    cognome: "",
    genere: "",
    azienda: "",
  });

  useEffect(() => {
    if (existingUser) {
      setNuovoUtente(existingUser);
    }
  }, [existingUser]);

  const handleChangeNuovoUtente = (e) => {
    const { name, value } = e.target;
    setNuovoUtente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddUtente = () => {
    if (!emailRegex.test(nuovoUtente.email)) {
      toast.error("Inserisci un'email valida");
      return;
    }

    // Controlla la validità della password
    if (!passwordRegex.test(nuovoUtente.password)) {
      toast.error(
        "La password deve contenere almeno 12 caratteri, una lettera maiuscola, una lettera minuscola, un numero e un carattere speciale"
      );
      return;
    }

    if (existingUser) {
      dispatch(updateUser({ id: existingUser._id, updateData: nuovoUtente }));
      toast.success("Utente aggiornato con successo!");
      onClose();
    } else {
      dispatch(createNewUser(nuovoUtente));
      toast.success("Appuntamento aggiunto con successo!");
      onClose();

      setNuovoUtente({
        email: "",
        password: "",
        username: "",
        ruolo: "",
        nome: "",
        cognome: "",
        genere: "",
        azienda: "",
      });
    }
  };

  // regex per validare l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // regex per validare la password
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

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
          {!!existingUser ? "Modifica utente" : "Crea un nuovo utente"}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
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
                value={nuovoUtente[input.name]}
                onChange={handleChangeNuovoUtente}
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
                value={nuovoUtente[input.name]}
                onChange={handleChangeNuovoUtente}
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
          onClick={handleAddUtente}
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={
            !nuovoUtente.email ||
            !nuovoUtente.password ||
            !nuovoUtente.username ||
            !nuovoUtente.ruolo ||
            !nuovoUtente.nome ||
            !nuovoUtente.cognome ||
            !nuovoUtente.genere ||
            !nuovoUtente.azienda
          }
        >
          {!!existingUser ? "Modifica utente" : "Crea utente"}
        </button>
      </div>
    </div>
  );
};

const NewUserPopup = ({ appuntamenti, onClose, existingUser }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10 
    "
    >
      <div className="bg-white rounded shadow-lg w-11/12 md:w-1/2 relative z-20 overflow-y-auto align-middle justify-center">
        <NewUserSection
          appuntamenti={appuntamenti}
          onClose={onClose}
          existingUser={existingUser}
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

export default NewUserPopup;
