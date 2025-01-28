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

export const fetchFilters = async () => {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`${API_BASE_URL}/filters`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) console.error(`Error: ${response.statusText}`);
  const result = await response.json();
  return result;
};

export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("No se encontró el token de autenticación");

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
  };

  return fetch(`${API_BASE_URL}/${endpoint}`, { ...options, headers });
};

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

export const getUser = async () => {
  const response = await fetchWithAuth("user", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(
      errorData.message || "Error al obtener los datos del usuario"
    );
  }

  return await response.json();
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
  console.log(response);
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
