import { useState,useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getUser} from "../services/api";

export default function Contact() {
    const { language } = useLanguage();
    const [sendEmail, setSendEmail] = useState(false);
    const [user,setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(false);
    const [userError, setUserError] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});
    
        useEffect(() => {
            setSendEmail(false);
          const fetchUser = async () => {
            try {
                setUserLoading(true);
              const usuario = await getUser();
              setUser(usuario);
            } catch (err) {
                setUserError(err.message);
            } finally {
                setUserLoading(false);
            }
          };
          fetchUser();
        }, []);

        useEffect(() => {
            if (user.data) {
                setFormData({
                    nombre: `${user.data.nombre} ${user.data.apellido}`,
                    email: user.data.email,
                    telf: user.data.telefono,
                    asunto: '',
                    mensaje: ''
                });
            }
        }, [user]);
        

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

        try {
            setSendEmail(true);
            setFormData({
                nombre: "",
                email: "",
                telf: "",
                asunto: '',
                mensaje: ''
            });
            
        } catch (error) {
            console.error(error);
            setError("Hubo un error al enviar el correo. Por favor, inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    if(userLoading) return <p>Cargando...</p>;
    if(userError) return <p>{userError}</p>;

    return (
        <>
            <h1 className="text-3xl font-bold mt-9">
                {language === "ca" ? "Pàgina de contacte" : language === "es" ? "Página de contacto" : "Contact page"}
            </h1>

            <fieldset 
                style={{ maxWidth: "700px" }}
                className="text-left bg-gray-400 mx-auto mt-10 mb-20 p-4 rounded-md shadow-lg shadow-green-700"    
            >

                <form onSubmit={handleSubmit} className="my-9 text-lg">
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
                            value={formData.nombre}
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
                            value={formData.email}
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
                            className="font-semibold border bg-green-600 text-white py-2 rounded-full mx-auto mt-4 px-5 block transition duration-300 hover:bg-white hover:text-green-600"
                            type="submit"
                            disabled={loading || sendEmail}
                        >
                            {loading
                                ? language === "ca" ? "Enviant..." : language === "es" ? "Enviando..." : "Sending..."
                                : language === "ca" ? "Enviar" : language === "es" ? "Enviar" : "Send"}
                        </button>
                    </div>

                    {sendEmail && (
                        <p className="text-xl font-semibold text-green-800 text-center mt-4">
                            {language === "ca" ? "El correu s'ha enviat correctament." : language === "es" ? "El correo se ha enviado correctamente." : "The email has been sent correctly."}
                        </p>
                    )}

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
