import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";


export default function Navigation(){

    const {hasToken, setHasToken} = useAuth();
    const { language } = useLanguage(); 
    const navigate = useNavigate();
    //LOGOUT
    const handleLogout = () => {
      
      localStorage.removeItem("authToken");
      setHasToken(false);
      navigate('/login'); 
    };

  return (
      <nav className="pr-7">
        <ul className=" flex gap-4 text-xl mt-3">
          <li className="flex p-2"><NavLink to="/home">
            {language === "ca" ? "Inici" : language === "es" ? "Inicio" : "Home" }
            </NavLink>
          </li>
          <li className="flex p-2"><NavLink to="/spaces">
            {language === "ca" ? "Espais" : language === "es" ? "Espacios" : "Spaces" }  
            </NavLink>
          </li>
          <li className="flex p-2"><NavLink to="/comments">
            {language === "ca" ? "Comentaris" : language === "es" ? "Comentarios" : "Comments" } 
            </NavLink>
          </li>
          <li className="flex p-2"><NavLink to="/contact">
            {language === "ca" ? "Contacte" : language === "es" ? "Contacto" : "Contact" } 
            </NavLink>
          </li>
          <li className="flex p-2"><NavLink to="/profile">
            {language === "ca" ? "Perfil" : language === "es" ? "Perfil" : "Profile" } 
            </NavLink>
          </li>
          { !hasToken ? <li className="flex p-2"><NavLink to="/login">
            {language === "ca" ? "Inicia/Registra't" : language === "es" ? "Inicia/Regístrate" : "Log in/Register" } 
            </NavLink></li> :
            <li className="flex p-2 font-semibold hover:scale-110 hover:text-green-800 "><button onClick={handleLogout}>
              {language === "ca" ? "Tancar sessió" : language === "es" ? "Cerrar Sesión" : "Logout" } 
              </button></li>
          }
          
        </ul>
      </nav>
  )
}