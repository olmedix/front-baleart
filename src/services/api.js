const API_BASE_URL = "http://baleart.test/api";

/**
 * Realiza una petición con autenticación.
 * @param {string} endpoint - Endpoint de la API.
 * @param {object} [options={}] - Opciones para la petición (headers, método, cuerpo, etc.).
 * @returns {Promise<Response>} - Respuesta de la API.
 */
export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No se encontró el token de autenticación");

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
  };

  return fetch(`${API_BASE_URL}/${endpoint}`, { ...options, headers });
};

/**
 * Realiza una petición de inicio de sesión.
 * @param {object} loginData - Datos de inicio de sesión (email y password).
 * @returns {Promise<object>} - Datos de respuesta del servidor.
 */
export const login = async (loginData) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error de inicio de sesión");
  }

  return response.json();
};

/**
 * Obtiene información del usuario autenticado.
 * @returns {Promise<object>} - Datos del usuario autenticado.
 */
export const getUser = async () => {
  const response = await fetchWithAuth("user");
  if (!response.ok) throw new Error("No autorizado");
  return response.json();
};
