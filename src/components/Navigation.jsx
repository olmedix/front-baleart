import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../contexts/LanguageContext";

export default function Navigation(){

    const { language } = useLanguage(); 
    const {user,setUser} = useAuth();
    const navigate = useNavigate();
    //LOGOUT
    const handleLogout = () => {
      localStorage.removeItem("authToken");
      setUser(null);
      navigate('/login'); 
    };

  return (
      <nav>
        <ul className="nav__list flex gap-4 text-xl mt-3">
          <li className="flex items-center p-2"><NavLink to="/home">
            {language === "ca" ? "Inici" : language === "es" ? "Inicio" : "Home" }
            </NavLink>
          </li>
          <li className="flex items-center p-2"><NavLink to="/spaces">
            {language === "ca" ? "Espais" : language === "es" ? "Espacios" : "Spaces" }  
            </NavLink>
          </li>
          <li className="flex items-center p-2"><NavLink to="/comments">
            {language === "ca" ? "Comentaris" : language === "es" ? "Comentarios" : "Comments" } 
            </NavLink>
          </li>
          <li className="flex items-center p-2"><NavLink to="/contact">
            {language === "ca" ? "Contacte" : language === "es" ? "Contacto" : "Contact" } 
            </NavLink>
          </li>
          <li className="flex items-center p-2"><NavLink to="/profile">
            {language === "ca" ? "Perfil" : language === "es" ? "Perfil" : "Profile" } 
            </NavLink>
          </li>
          { !user ? <li className="flex items-center p-2"><NavLink to="/login">
            {language === "ca" ? "Inicia/Registra't" : language === "es" ? "Inicia/Regístrate" : "Log in/Register" } 
            </NavLink></li> :
            <li className="flex items-center p-2 font-semibold hover:scale-110 hover:text-green-800 "><button onClick={handleLogout}>
              {language === "ca" ? "Tancar sessió" : language === "es" ? "Cerrar Sesión" : "Logout" } 
              </button></li>
          }
          
        </ul>
      </nav>
  )
}