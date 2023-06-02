import React from "react";

const AppointmentCard = ({ data, ora, descrizione }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{data}</h3>
      <p className="text-sm text-gray-600">{ora}</p>
      <p className="text-gray-800">{descrizione}</p>
    </div>
  );
};

export default AppointmentCard;
