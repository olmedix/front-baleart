import { useState } from 'react';

export default function Authentication(){

        const [initPassword, setInitPassword] = useState(false); 
        const [registerPassword, setRegisterPassword] = useState(false); 
        const [user,setUser] = useState(null);
        const [loginData, setLoginData] = useState({ email: "", password: "" });
        const [loginError, setLoginError] = useState(null);

        useEffect(() => {
            const fetchUser = async () => {
              try {
                const response = await fetch('http://baleart.test/api/user', {
                  credentials: 'include', // Para enviar cookies de sesión
                });
                if (response.ok) {
                  const userData = await response.json();
                  setUser(userData);
                  localStorage.setItem("authToken", userData.token);
                  
                } else {
                    const errorData = await response.json();
                    setLoginError(errorData.message || "Error de inicio de sesión");                  
                }
              } catch (error) {
                console.error("Error fetching user:", error);
                setUser(null);
              }
            };
        
            fetchUser();
          }, []);



        const handleLoginChange = (e) => {
            setLoginData({
              ...loginData,
              [e.target.name]: e.target.value,
            });
        };
        
            const handleLoginSubmit = async (e) => {
                e.preventDefault();
                setLoginError(null);
            
                try {
                  const response = await fetch("http://baleart.test/api/login", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    credentials: "include", // Para enviar cookies de sesión
                    body: JSON.stringify(loginData),
                  });
            
                  if (response.ok) {
                    const userData = await response.json();
                    setUser(userData); // Actualiza el estado del usuario
                    console.log("Login exitoso:", userData);
                    // Redirige o actualiza la UI después del login
                  } else {
                    const errorData = await response.json();
                    setLoginError(errorData.message || "Error de inicio de sesión");
                  }
                } catch (error) {
                  console.error("Error during login:", error);
                  setLoginError("No se pudo conectar con el servidor");
                }
              };

              //Guardar sesion en el local storage
              const fetchWithAuth = async (url, options = {}) => {
                const token = localStorage.getItem("authToken");
              
                if (!token) {
                  throw new Error("No se encontró el token de autenticación");
                }
              
                const headers = {
                  ...options.headers,
                  Authorization: `Bearer ${token}`,
                };
              
                return fetch(url, { ...options, headers });
              };
              
              


        // Función para mostrar/ocultar la contraseña
        const initPasswordVisibility = () => { 
            setInitPassword(!initPassword); 
        }
        const registerPasswordVisibility = () => { 
            setRegisterPassword(!registerPassword); 
        }

    return(
        <div className="flex mt-12">
            <div className="w-1/2 mr-5">
                <h2 className="text-3xl font-semibold mb-8">Registra&apos;t</h2>
                <form className="px-5 bg-gray-300 p-4 rounded-xl mb-5">
                    <label htmlFor="name" className="block text-left font-bold ml-2 mb-1 text-lg">Nom <span className="text-red-500">*</span></label>
                    <input type="text" id="name" name="name" required placeholder="Nom..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="lastName" className="block text-left font-bold ml-2 mb-2 text-lg">Cognoms <span className="text-red-500">*</span></label>
                    <input type="text" id="lastName" name="lastName" required placeholder="Cognoms..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="email" className="block text-left font-bold ml-2 mb-2 text-lg">Email <span className="text-red-500">*</span></label>
                    <input type="email" id="email" name="email" required placeholder="Email..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="phone" className="block text-left font-bold ml-2 mb-2 text-lg">Telèfon <span className="text-red-500">*</span></label>
                    <input type="tel" id="phone" name="phone" required placeholder="Telèfon..." className="block p-3 rounded-xl border border-gray-300  w-full "/>

                    <label htmlFor="password" className="block text-left font-bold ml-2 mb-2 text-lg">Contrassenya <span className="text-red-500">*</span></label>
                    <div className="relative w-full">
                        <input 
                            type={registerPassword ? 'text' : 'password'} 
                            id="password" 
                            name="password" 
                            required 
                            placeholder="contrassenya..." 
                            className="block p-3 rounded-xl border border-gray-300 w-full pr-10"
                        />
                        <span 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                            onClick={registerPasswordVisibility} > {registerPassword ? '🙈' : '🙉'}
                        </span>
                    </div>

                    <button className="my-5 py-4 px-32 font-semibold bg-slate-600 rounded-full" type="submit">REGISTRA&apos;T</button>
                </form>
            </div>

            <div className="w-1/2">
                <h2 className="text-3xl font-semibold mb-8">Iniciar sessió</h2>
                <form className="px-5 bg-gray-300 p-4 rounded-xl"
                      onSubmit={handleLoginSubmit}
                >
                    <label htmlFor="email" className="block text-left font-bold ml-2 mb-2 text-lg">Email <span className="text-red-500">*</span></label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        placeholder="Email..." 
                        className="block p-3 rounded-xl border border-gray-300  w-full "
                        onChange={handleLoginChange}
                    />


                    <label htmlFor="password" className="block text-left font-bold ml-2 mb-2 text-lg">Contrassenya <span className="text-red-500">*</span></label>
                    <div className="relative w-full">
                        <input 
                            type={initPassword ? 'text' : 'password'} 
                            id="password" 
                            name="password" 
                            required 
                            placeholder="contrassenya..." 
                            className="block p-3 rounded-xl border border-gray-300 w-full pr-10"
                            onChange={handleLoginChange}
                        />
                        <span 
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                            onClick={initPasswordVisibility} > {initPassword ? '🙈' : '🙉'}
                        </span>
                    </div>

                     <button className="my-5 py-4 px-32 bg-slate-600 font-semibold rounded-full" type="submit">INICIAR SESSEIÓ</button>
                </form>
            </div>
        </div>
    )
}
