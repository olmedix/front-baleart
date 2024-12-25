import { useState, useEffect } from 'react';

export default function Login() {
  const [initPassword, setInitPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const validateUser = async () => {
        try {
            const response = await fetchWithAuth("http://baleart.test/api/user");
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                console.error("No autorizado");
                setUser(null);
                localStorage.removeItem("authToken"); // Limpia el token si no es válido
            }
        } catch (error) {
            console.error("Error validando usuario:", error);
            setUser(null);
        }
    };

    validateUser();
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
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("authToken", data.access_token); // Guarda el token en localStorage
            setUser({ email: loginData.email }); // Simula el usuario autenticado
            console.log("Login exitoso:", data);
        } else {
            const errorData = await response.json();
            setLoginError(errorData.message || "Error de inicio de sesión");
        }
    } catch (error) {
        console.error("Error durante la conexión:", error);
        setLoginError("No se pudo conectar con el servidor");
    }finally {
        setIsSubmitting(false); // Permite nuevos envíos
    }
};

const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No se encontró el token de autenticación");

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    };

    return fetch(url, { ...options, headers });
};


//LOGOUT
const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    console.log("Sesión cerrada");
};




  const initPasswordVisibility = () => {
    setInitPassword(!initPassword);
  };

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-3xl font-semibold mb-8">Iniciar sesión</h2>
      <form
        className="px-5 bg-gray-300 p-4 rounded-xl"
        onSubmit={handleLoginSubmit}
      >
        <label
          htmlFor="email"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email..."
          className="block p-3 rounded-xl border border-gray-300  w-full"
          onChange={handleLoginChange}
        />

        <label
          htmlFor="password"
          className="block text-left font-bold ml-2 mb-2 text-lg"
        >
          Contraseña <span className="text-red-500">*</span>
        </label>
        <div className="relative w-full">
          <input
            type={initPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            placeholder="Contraseña..."
            className="block p-3 rounded-xl border border-gray-300 w-full pr-10"
            onChange={handleLoginChange}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={initPasswordVisibility}
          >
            {initPassword ? "🙈" : "🙉"}
          </span>
        </div>

        {loginError && (
          <p className="text-red-500 text-sm mt-2">{loginError}</p>
        )}

        <button
          className="my-5 py-4 px-32 bg-slate-600 font-semibold rounded-full"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "INICIAR SESIÓN"}
        </button>
      </form>
    </div>
  );
}
