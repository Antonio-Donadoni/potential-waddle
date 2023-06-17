import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/accountSlice";
import { useNavigate } from "react-router-dom";
import { LoaderIcon } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const loading = useSelector((state) => state.account.loading);
  const error = useSelector((state) => state.account.error);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      login({
        email,
        password,
      })
    );
    // Effettua l'autenticazione qui utilizzando i dati email e password
    console.log("Email:", email);
    console.log("Password:", password);
  };

  useEffect(() => {
    if (!!authToken) {
      navigate("/");
    }
  }, [authToken]);

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white">
        <h1 className="text-2xl font-bold mb-4 text-blue-800">Accedi</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4  flex items-center justify-between">
            <label htmlFor="email" className="text-gray-700 font-semibold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="border border-gray-300 rounded py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-6 flex items-center justify-between">
            <label htmlFor="password" className="text-gray-700 font-semibold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="border border-gray-300 rounded py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className=" flex flex-col items-center justify-center">
            {!!error && (
              <p className="text-red-500 text-sm font-semibold mb-1">
                Credenziali errate, prego riprovare.
              </p>
            )}

            <button
              className="bg-blue-800 text-white px-8 py-2 rounded hover:bg-blue-500 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={!email || !password}
            >
              {!loading ? "Login" : <LoaderIcon className="animate-spin" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
