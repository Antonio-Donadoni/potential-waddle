import { base_url } from "../config/server";
const API_ROOT_URL = base_url;

const getHeaders = () => {
  const headers = {
    "Content-Type": "application/json",
    "access-control-allow-origin": "*",
  };
  return headers;
};

const getAuthHeaders = () => {
  const authToken = localStorage.getItem("authToken");
  const headers = {
    ...getHeaders(),
    Authorization: "Bearer " + authToken,
  };
  return headers;
};

const requests = {
  // SESSIONS
  login: (credentials) => {
    return {
      url: `${API_ROOT_URL}/login`,
      method: "POST",
      headers: getHeaders(),
      data: credentials,
    };
  },
  getProfile: () => {
    return {
      url: `${API_ROOT_URL}/profile`,
      method: "GET",
      headers: getAuthHeaders(),
    };
  },
  getAllUsers: () => {
    return {
      url: `${API_ROOT_URL}/users`,
      method: "GET",
      headers: getAuthHeaders(),
    };
  },
  createNewUser: (newUser) => {
    return {
      url: `${API_ROOT_URL}/users`,
      method: "POST",
      headers: getAuthHeaders(),
      data: newUser,
    };
  },

  updateUser: (id, updateData) => {
    return {
      url: `${API_ROOT_URL}/users/${id}`,
      method: "PATCH",
      headers: getAuthHeaders(),
      data: updateData,
    };
  },

  deleteUser: (id) => {
    return {
      url: `${API_ROOT_URL}/users/${id}`,
      method: "DELETE",
      headers: getAuthHeaders(),
    };
  },

  // APPOINTMENTS

  getAllAppointments: () => {
    return {
      url: `${API_ROOT_URL}/appointments`,
      method: "GET",
      headers: getAuthHeaders(),
    };
  },
  createNewAppointment: (appointment) => {
    return {
      url: `${API_ROOT_URL}/appointments`,
      method: "POST",
      headers: getAuthHeaders(),
      data: appointment,
    };
  },
  updateAppointment: (id, updateData) => {
    return {
      url: `${API_ROOT_URL}/appointments/${id}`,
      method: "PATCH",
      headers: getAuthHeaders(),
      data: updateData,
    };
  },
  deleteAppointment: (id) => {
    return {
      url: `${API_ROOT_URL}/appointments/${id}`,
      method: "DELETE",
      headers: getAuthHeaders(),
    };
  },
};
export default requests;
