import { NavLink } from "react-router-dom";

export default function Navigation(){
  return (
      <nav>
        <ul className="nav__list flex gap-4 text-xl mt-3">
          <li className="nav__item"><NavLink to="/home">Inici</NavLink></li>
          <li className="nav__item"><NavLink to="/spaces">Espais</NavLink></li>
          <li className="nav__item"><NavLink to="/comments">Comentaris</NavLink></li>
          <li className="nav__item"><NavLink to="/contact">Contacte</NavLink></li>
          <li className="nav__item"><NavLink to="/login">Iniciar sessió</NavLink></li>
          <li className="nav__item"><NavLink to="/register">Registrarse</NavLink></li>
          <li className="nav__item"><NavLink to="/profile">Perfil</NavLink></li>
        </ul>
      </nav>
  )
}