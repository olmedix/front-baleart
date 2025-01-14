import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";

export default function Navigation(){

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
          <li className="nav__item"><NavLink to="/home">Inici</NavLink></li>
          <li className="nav__item"><NavLink to="/spaces">Espais</NavLink></li>
          <li className="nav__item"><NavLink to="/comments">Comentaris</NavLink></li>
          <li className="nav__item"><NavLink to="/contact">Contacte</NavLink></li>
          <li className="nav__item"><NavLink to="/profile">Perfil</NavLink></li>
          { !user ? <li className="nav__item"><NavLink to="/login">Inicia/Registra&apos;t</NavLink></li> :
                    <li className="nav__item"><button onClick={handleLogout}>Logout</button></li>
          }
          
        </ul>
      </nav>
  )
}