import { createContext,useState } from "react";


//Creamos el contexto
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({children}){
    const [user,setUser] = useState(null);

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;