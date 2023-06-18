import { ToastContainer } from "react-toastify";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features/usersSlice";
import UserCard from "./components/UserCard";
import NewUserPopup from "./components/NewUserSection";

const UserList = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const users = useSelector((state) => state.users.data);
  const [isNewUserSectionOpen, setIsNewUserSectionOpen] = useState(false);

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
          {!!isNewUserSectionOpen && (
            <NewUserPopup onClose={() => setIsNewUserSectionOpen(false)} />
          )}
          <div className="flex flex-row justify-between items-center mb-5">
            <div className=" text-xl md:text-3xl font-blue-800 font-semibold text-gray-900">
              Lista utenti
            </div>
            <div className="flex flex-row items-center">
              <div
                onClick={() => setIsNewUserSectionOpen(true)}
                className="bg-blue-800 text-white px-8 py-2 cursor-pointer text-xs md:text-sm
                 font-semibold uppercase
                rounded hover:bg-blue-500 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
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
                users.map((user) => <UserCard user={user} />)
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
