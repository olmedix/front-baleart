import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function PrivateRoute({ children }) {
  const isAuthenticated = 
  Boolean(localStorage.getItem("authToken")); 
  return isAuthenticated ? children : <Navigate to="/login" />;
}

// Validación de props
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
