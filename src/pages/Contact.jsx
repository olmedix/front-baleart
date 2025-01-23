import { useAuth} from "../hooks/useAuth";
import { useLanguage } from "../contexts/LanguageContext";


export default function Contact(){
    const { language } = useLanguage();
    const {user} = useAuth();

    return(
        <>
            <h1 className="text-3xl font-bold mb-6">
                {language === "ca" ? "Pàgina de contacte" : language === "es" ? "Página de contacto" : "Contact page"}
            </h1>

            <fieldset className="text-left bg-gray-400  my-10 border border-gray-600 p-4 rounded-md shadow-md">
                <legend className="text-xl text-center font-bold mb-4 px-2">
                    {language === "ca" ? "Informació de contacte" : language === "es" ? "Información de contacto" : "Contact information"}
                </legend>

                <form
                    action="https://formsubmit.co/joa00@iesemilidarder.com" 
                    className="space-y-4 text-lg"
                    method="POST"
                >
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
                            defaultValue={`${user?.data?.nombre} ${user?.data?.apellido}` || ""}
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
                            defaultValue={user?.data?.email || ""}
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
                            placeholder="+34123456789"
                            defaultValue={user?.data?.telefono || ""}
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
                            required
                        ></textarea>
                    </div>

                    <div className="flex items-center justify-center">
                    <button
                        type="button"
                        className="border bg-green-600 text-white p-2 rounded-full mt-3 px-5 block text-center"
                    >
                        {language === "ca" ? "Enviar" : language === "es" ? "Enviar" : "Send"}
                    </button> 
                       
                    </div>
                </form>
            </fieldset>
        </>
    )
}