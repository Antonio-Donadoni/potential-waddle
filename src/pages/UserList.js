import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../features/usersSlice";
import { Trash2 } from "lucide-react";

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.data);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen ">
      <Navbar />
      <div
        className=" px-4 sm:px-6 lg:px-8 py-8 
    "
      >
        <ToastContainer />
        <div className="container mx-auto">
          <div className="flex flex-row justify-between items-center mb-5">
            <div className="text-3xl font-blue-800 font-semibold text-gray-900">
              Lista utenti
            </div>
            <div className="flex flex-row items-center">
              <div className="bg-blue-800 text-white px-8 py-2 rounded hover:bg-blue-500 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
                Aggiungi utente
              </div>
              {/* <div className="text-md text-blue-800 uppercase font-semibold pr-6">
                Modifica utente
              </div> */}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              {users?.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="py-4 align-middle relative inline-block min-w-full sm:px-6 lg:px-8 bg-white shadow overflow-hidden sm:rounded-lg mb-4 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center">
                        <div className="flex-shrink-0 h-14 w-14">
                          <img
                            className="h-14 w-14 rounded-full"
                            src={user.avatar || "https://unsplash.it/200/200"}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {user.nome + " " + user.cognome}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {"Azienda: " + user.azienda}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row items-center">
                        <div className="text-md text-blue-800 uppercase font-semibold pr-6">
                          {user.ruolo}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center absolute md:right-2 md:top-2  right-1 top-1 ">
                      <div className="w-4 h-4 flex justify-center items-center cursor-pointer ml-2 hover:scale-110 transform transition duration-300 ease-in-out ">
                        <Trash2
                          strokeWidth={3}
                          className="text-blue-800 cursor-pointer"
                          //             onClick={() => setShowDeletePopup(true)}
                        />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-row justify-center items-center">
                  <div className="text-sm text-gray-500">
                    Nessun utente trovato
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
