import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { updateUserByEmail } from "../services/api";

export default function ModalForm({ userEmail, setUser }) {

    const { language } = useLanguage();
    const [isOpen,setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    // Cerrar modal al hacer clic fuera
    const handleOverlayClick = (e) => {
        if (e.target.id === "overlay") closeModal();
    };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

        const handleUpdate = async (e) => {
            e.preventDefault();
            setError(null); 

          try {
            setIsLoading(true);
            const updatedUser = await updateUserByEmail(userEmail, formData);
            setUser(updatedUser);
            closeModal();
          } catch (err) {
            setError(err.message);
          } finally {
            setIsLoading(false);
          }
        };


    return (
        <>
            <button className="content-end bg-amber-300  transition duration-500 hover:bg-black hover:text-amber-300 border-2 font-semibold border-stone-500 py-3 px-14" type="button"
                  onClick={openModal}
            >
                <i className="fa-solid fa-pencil mr-1"></i>
                {language === "ca" ? "Editar" : language === "es" ? "Editar" : "Edit"}
            </button>

            { isOpen && (
              <div
                id="overlay"
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                onClick={handleOverlayClick} 
                >
              <div className="bg-white p-6 rounded shadow-lg w-1/3 relative">

                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 text-gray-500"
                >
                  ✖
                </button>
    
                <h2 className="text-xl font-semibold mb-4">
                {language === "ca" ? "Actualització de dades" : language === "es" ? "Actualización de datos" : "Update data"}
                </h2>

                {isLoading && <p className="text-blue-500">Cargando...</p>}
                {error && <p className="text-red-500">{error}</p>}
    
                {/* Formulario */}
                <form onSubmit={handleUpdate}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      {language === "ca" ? "Nom" : language === "es" ? "Nombre" : "Name"}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full border border-gray-300 rounded p-2"
                      placeholder="Nom..."
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      {language === "ca" ? "Cognoms" : language === "es" ? "Apellidos" : "Last name"}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="mt-1 block w-full border border-gray-300 rounded p-2"
                      placeholder="Cognoms..."
                      onChange={handleInputChange}
                    />
                  </div>
    
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      {language === "ca" ? "Email" : language === "es" ? "Correo electrónico" : "Email"}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full border border-gray-300 rounded p-2"
                      placeholder="Email..."
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      {language === "ca" ? "Telèfon" : language === "es" ? "Teléfono" : "Phone"}
                    </label>
                    <input
                      type="phone"
                      id="phone"
                      name="phone"
                      className="mt-1 block w-full border border-gray-300 rounded p-2"
                      placeholder="Telèfon..."
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      {language === "ca" ? "Contrasenya" : language === "es" ? "Contraseña" : "Password"}
                    </label>
                    <input
                      type="text"
                      id="password"
                      name="password"
                      className="mt-1 block w-full border border-gray-300 rounded p-2"
                      placeholder="Contrasenya..."
                      onChange={handleInputChange}
                    />
                  </div>
    
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    {language === "ca" ? "Enviar" : language === "es" ? "Enviar" : "Send"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </>
    )
}