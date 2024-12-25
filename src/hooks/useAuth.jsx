import { useContext } from "react";
import  AuthContext  from "../contexts/AuthContext";

// Hook personalizado para acceder al contexto
export function useAuth() {
    return useContext(AuthContext);
}
