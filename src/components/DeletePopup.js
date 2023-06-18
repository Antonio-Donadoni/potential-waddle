const DeletePopup = ({ setShowDeletePopup, handleDelete, text }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
      <div className="bg-white rounded shadow-lg w-80 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">{text}</h2>
        <div className="flex justify-end">
          <button
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
            onClick={() => setShowDeletePopup(false)}
          >
            Annulla
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => handleDelete()}
          >
            Elimina
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
