import { useState } from "react";

import { useAuth } from "../hooks/useAuth";
import { useLanguage } from "../contexts/LanguageContext";
import { fetchSendEmail } from "../services/api";

export default function Contact() {
    const { language } = useLanguage();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        nombre: user ? user.data.nombre : '',
        email: user ? user.data.email : '',
        telf: user ? user.data.telefono : '',
        asunto: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        console.log("FormData: "+formData);

        try {
            // Llamada al servicio para enviar el correo
            const result = await fetchSendEmail({
                nombre: formData.nombre,
                email: formData.email,
                telf: formData.telf,
                asunto: formData.asunto,
                mensaje: formData.mensaje,
            });
            console.log("resultado: "+result);
            alert(result.message); // Muestra el mensaje de éxito devuelto por el backend
        } catch (error) {
            console.error(error);
            setError("Hubo un error al enviar el correo. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold mb-6">
                {language === "ca" ? "Pàgina de contacte" : language === "es" ? "Página de contacto" : "Contact page"}
            </h1>

            <fieldset className="text-left bg-gray-400 my-10 border border-gray-600 p-4 rounded-md shadow-md">
                <legend className="text-xl text-center font-bold mb-4 px-2">
                    {language === "ca" ? "Informació de contacte" : language === "es" ? "Información de contacto" : "Contact information"}
                </legend>

                <form onSubmit={handleSubmit} className="space-y-4 text-lg">
                    <div>
                        <label className="block font-medium pl-5" htmlFor="nombre">
                            {language === "ca" ? "Nom " : language === "es" ? "Nombre " : "Name "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-center"
                            type="text"
                            name="nombre"
                            id="nombre"
                            value={formData?.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium pl-5" htmlFor="email">
                            {language === "ca" ? "Email " : language === "es" ? "Email " : "Email "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-center"
                            type="email"
                            name="email"
                            id="email"
                            value={formData?.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium pl-5" htmlFor="telf">
                            {language === "ca" ? "Número de telèfon " : language === "es" ? "Número de teléfono " : "Phone number "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-center"
                            type="tel"
                            name="telf"
                            id="telf"
                            value={formData.telf}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium pl-5" htmlFor="asunto">
                            {language === "ca" ? "Assumpte " : language === "es" ? "Asunto " : "Subject "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-center"
                            type="text"
                            name="asunto"
                            id="asunto"
                            value={formData.asunto}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium pl-5" htmlFor="mensaje">
                            {language === "ca" ? "Missatge " : language === "es" ? "Mensaje " : "Message "}
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-center"
                            name="mensaje"
                            id="mensaje"
                            value={formData.mensaje}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div>
                        <button
                            className="w-full bg-green-600 text-white py-2 px-4 rounded-md shadow-sm transition duration-300 hover:bg-green-800"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? language === "ca" ? "Enviant..." : language === "es" ? "Enviando..." : "Sending..."
                                : language === "ca" ? "Enviar" : language === "es" ? "Enviar" : "Send"}
                        </button>
                    </div>

                    {error && (
                        <p className="text-red-500 text-center mt-4">
                            {error}
                        </p>
                    )}
                </form>
            </fieldset>
        </>
    );
}
