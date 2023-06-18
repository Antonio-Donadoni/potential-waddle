import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DeletePopup from "../../../components/DeletePopup";
import { deleteUser } from "../../../features/usersSlice";
import NewUserPopup from "./NewUserSection";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const handleDelete = () => {
    const deletedUser = dispatch(deleteUser(user._id));
    if (deletedUser.error) {
      toast.error("Errore durante l'eliminazione dell'utente");
      return;
    } else {
      toast.success("Utente eliminato!");
      setShowDeletePopup(false);
    }
  };
  return (
    <div
      key={user._id}
      className="py-4 align-middle relative inline-block min-w-full sm:px-6 lg:px-8 bg-white shadow overflow-hidden sm:rounded-lg mb-4 cursor-pointer hover:bg-gray-50"
    >
      {!!showDeletePopup && (
        <DeletePopup
          setShowDeletePopup={setShowDeletePopup}
          handleDelete={handleDelete}
          text={"Sei sicuro di voler eliminare questo utente?"}
        />
      )}

      {!!showEditPopup && (
        <NewUserPopup
          onClose={() => setShowEditPopup(false)}
          existingUser={user}
        />
      )}
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
            <div className="text-sm text-gray-500">{user.email}</div>
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
      <div className="flex items-center absolute md:right-8 md:top-2  right-6 top-1 ">
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

export default UserCard;
