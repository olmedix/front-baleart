import { createContext,useState,useEffect } from "react";


//Creamos el contexto
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({children}){
    const [user,setUser] = useState(null);

    useEffect(() => { 
        // Cargar el usuario desde localStorage si existe 
        const storedUser = localStorage.getItem('authEmail'); 
            if (storedUser) { 
                setUser({ email: storedUser });
            } 
        },[]);

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;