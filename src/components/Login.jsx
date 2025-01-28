import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { login} from '../services/api';
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";


export default function Login() {

  const {setHasToken} = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [initPassword, setInitPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
            setHasToken(true);
            window.location.href = "/home";
            
    } catch (error) {
        setLoginError(error.message);
    }finally {
        setIsSubmitting(false);
    }
  };

  const initPasswordVisibility = () => {
    setInitPassword(!initPassword);
  };


  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-3xl font-semibold mb-8">
        {language === "ca" ? "Inicia sessió" : language === "es" ? "Inicia sesión" : "Log in"}
      </h2>
      <form
        className="px-5 bg-gray-300 p-4 rounded-xl"
        onSubmit={handleLoginSubmit}
      >
        <label
          htmlFor="email"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          {language === "ca"
            ? "Email"
            : language === "es"
            ? "Correo electrónico"
            : "Email"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder={
            language === "ca"
              ? "Email..."
              : language === "es"
              ? "Correo electrónico..."
              : "Email..."
          }
          className="block p-3 rounded-xl border border-gray-300  w-full"
          onChange={handleLoginChange}
        />
  
        <label
          htmlFor="password"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          {language === "ca"
            ? "Contrasenya"
            : language === "es"
            ? "Contraseña"
            : "Password"}{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="relative w-full">
          <input
            type={initPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            placeholder={
              language === "ca"
                ? "Contrasenya..."
                : language === "es"
                ? "Contraseña..."
                : "Password..."
            }
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
          {isSubmitting
            ? language === "ca"
              ? "Enviant..."
              : language === "es"
              ? "Enviando..."
              : "Sending..."
            : language === "ca"
            ? "INICIA SESSIÓ"
            : language === "es"
            ? "INICIA SESIÓN"
            : "LOG IN"}
        </button>
      </form>
      <button
        className="my-5 py-4 text-red-400 text-xl font-semibold rounded-full"
        onClick={() => navigate("/forgot-password")}
      >
        {language === "ca"
          ? "He oblidat la contrasenya"
          : language === "es"
          ? "He olvidado la contraseña"
          : "I forgot my password"}
      </button>
    </div>
  );
}  