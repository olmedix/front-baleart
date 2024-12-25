import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {login, getUser} from '../services/api';
import { useAuth } from "../hooks/useAuth";

export default function Login() {

  const {setUser} = useAuth();
  const navigate = useNavigate();
  const [initPassword, setInitPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const validateUser = async () => {
        try {
                const userData = await getUser();
                setUser(userData);
        } catch (error) {
            console.error("Error validando usuario:", error.message);
            setUser(null);
            localStorage.removeItem("authToken");
        }
    };

      validateUser();
    }, [setUser]);


  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError(null);
    setIsSubmitting(true);

    try {
            const data = await login(loginData);
            localStorage.setItem("authToken", data.access_token);
            setUser({ email: loginData.email }); // Simula el usuario autenticado
            navigate('/home');
            console.log("Login exitoso:", data);
    } catch (error) {
        console.error("Error durante la conexión:", error.message);
        setLoginError(error.message);
    }finally {
        setIsSubmitting(false); // Permite nuevos envíos
    }
  };

  const initPasswordVisibility = () => {
    setInitPassword(!initPassword);
  };

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-3xl font-semibold mb-8">Inicia sessió</h2>
      <form
        className="px-5 bg-gray-300 p-4 rounded-xl"
        onSubmit={handleLoginSubmit}
      >
        <label
          htmlFor="email"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email..."
          className="block p-3 rounded-xl border border-gray-300  w-full"
          onChange={handleLoginChange}
        />

        <label
          htmlFor="password"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Contrassenya <span className="text-red-500">*</span>
        </label>
        <div className="relative w-full">
          <input
            type={initPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            placeholder="Contraseña..."
            className="block p-3 rounded-xl border border-gray-300 w-full pr-10"
            onChange={handleLoginChange}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={initPasswordVisibility}
          >
            {initPassword ? "🙈" : "🙉"}
          </span>
        </div>

        {loginError && (
          <p className="text-red-500 text-sm mt-2">{loginError}</p>
        )}

        <button
          className="my-5 py-4 px-32 bg-slate-600 font-semibold rounded-full"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviant..." : "INICIA SESSIÓ"}
        </button>
      </form>
    </div>
  );
}
