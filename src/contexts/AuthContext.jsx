import { createContext,useState,useEffect } from "react";


//Creamos el contexto
const AuthContext = createContext();


export function AuthProvider({children}){
    const [user,setUser] = useState(localStorage.getItem("authUser") || null);
    const [token,setToken] = useState(localStorage.getItem("authToken") || null);

    useEffect(() => { 
        const restoreSesion = async () => {
        const storedUser =  localStorage.getItem("authUser");
        const storedToken = localStorage.getItem("authToken");
        if(storedUser && storedToken){
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }
    restoreSesion();
    },[]);

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;