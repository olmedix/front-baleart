const API_BASE_URL = "http://baleart.test/api";

export const fetchSpaces = async () => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_BASE_URL}/spaces`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al obtener los espacios");
  const result = await response.json();
  return result.data;
};

export const fetchComments = async (regNumber, comments) => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_BASE_URL}/spaces/${regNumber}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comments }),
  });
  if (!response.ok) throw new Error("Error al enviar los comentarios");
  const result = await response.json();
  return result;
};

export const fetchMunicipalities = async () => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_BASE_URL}/municipalities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al obtener los municipios");
  const result = await response.json();
  return result;
};

export const fetchGetComments = async (userId) => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_BASE_URL}/comments/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al obtener los comentarios");
  const result = await response.json();
  return result;
};

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

/**
 * Realiza una petición de registro.
 * @param {object} registerData - Datos de registro (name, email, password).
 * @returns {Promise<object>} - Datos de respuesta del servidor.
 */
export const register = async (registerData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error en el registro");
  }

  return response.json();
};

//USER

/**
 * Obtiene los datos de un usuario por su email.
 * @param {string} email - Email del usuario.
 * @returns {Promise<object>} - Datos del usuario.
 */
export const getUserByEmail = async (email) => {
  const response = await fetchWithAuth(`user/${email}`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Error al obtener los datos del usuario"
    );
  }

  return response.json();
};

export const getUserByEmailOnly = async (email) => {
  const response = await fetch(`${API_BASE_URL}/user/resetPassword/${email}`, {
    method: "GET",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Error al obtener los datos del usuario"
    );
  }

  return response.json();
};

export const updateUserByEmailOnly = async (email, updatedData) => {
  const response = await fetch(`${API_BASE_URL}/user/${email}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error:", errorData);
    throw new Error(
      errorData.message || "Error al actualizar los datos del usuario"
    );
  }

  return response.json();
};

/**
 * Actualiza los datos de un usuario por su email.
 * @param {string} email - Email del usuario.
 * @param {object} updatedData - Datos a actualizar.
 * @returns {Promise<object>} - Datos actualizados del usuario.
 */
export const updateUserByEmail = async (email, updatedData) => {
  const response = await fetchWithAuth(`user/${email}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error:", errorData);
    throw new Error(
      errorData.message || "Error al actualizar los datos del usuario"
    );
  }

  return response.json();
};

/**
 * Elimina un usuario por su email.
 * @param {string} email - Email del usuario.
 * @returns {Promise<object>} - Respuesta del servidor tras la eliminación.
 */
export const deleteUserByEmail = async (email) => {
  const response = await fetchWithAuth(`user/${email}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al eliminar el usuario");
  }

  return response.json();
};
