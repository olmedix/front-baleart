import { useState } from "react";
import { fetchComments } from "../services/api";
import { FaRegSmileBeam } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

export default function AddComment({ regNumber }) {
    
    const { language } = useLanguage(); 
    const [puntuacio, setPuntuacio] = useState(0);
    const [isPuntuacio, setIsPuntuacio] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(false);
    const [imageMessage, SetImageMessage] = useState(false);
    const [error, setError] = useState(null);
    const [isURLError, setIsURLError] = useState(false);
    const [imagesURL, setImagesURL] = useState("");
    const [comentari, setComentari] = useState({
            comment: '',
            score: 0,
            images: [],
    });

    const handleStarClick = (index) => {
        const puntuacio = index + 1;
        setPuntuacio(puntuacio);

        if(puntuacio>0){
            setIsPuntuacio(false);
            setComentari(prev =>({ ...prev, score: puntuacio}));
        }
    };

    const isValidURL = (url) => {
        const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
        return urlPattern.test(url);
    };

    const handleImageURL = () => {
        setIsURLError(false);
        if(imagesURL.trim() === "" || !isValidURL(imagesURL) || imagesURL.length >= 100)  return setIsURLError(true);
        
        setComentari(prev =>({ ...prev,images:[ ...prev.images, imagesURL.trim()]}));
        setImagesURL("");
        SetImageMessage(true);
        setTimeout(() => {
            SetImageMessage(false);
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (puntuacio === 0) {
            setIsPuntuacio(true);
            return;
        }else{
            setLoading(true);
            setIsPuntuacio(false);
        }
        
        try {
            await fetchComments(regNumber, [comentari]);
            setMessage(true);
            setComentari({ comment: "", score: 0, images: [] });
            setPuntuacio(0);
            setTimeout(() => {
                setMessage(false);
            }, 3000);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
    };

    const selectStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <i
                    key={i}
                    className={` ${i < puntuacio ? 'fa-solid fa-star' : 'fa-regular fa-star'}`}
                    onClick={() => handleStarClick(i)} 
                />
            );
        }
        return stars;
    };


    return(
        <form 
            className="mt-3 px-5 border-b border-gray-300 pb-5"
            onSubmit={handleSubmit}    
        >
            <label className="block font-semibold mb-2">
            {language === "ca" ? "Afegeix un comentari " : language === "es" ? "Agrega un comentario" : "Add a comment " }
            </label>
            <textarea 
                className="w-full border border-gray-700 p-2 rounded-lg" 
                minLength={10}
                value={comentari.comment}
                 required
                 onChange={(e) => setComentari({ ...comentari, comment: e.target.value })}    
             >
             </textarea>

            <label className="block mt-1 font-semibold">
            {language === "ca" ? "Valora aquest espai: " : language === "es" ? "Valora este espacio:" : "Value this space: " }
                
            </label>
            <p className="text-green-600 text-xl pl-3 cursor-pointer">{selectStars()}</p>
                {
                    isPuntuacio &&
                    <p className="text-red-500 font-semibold">
                        {language === "ca" ? "Selecciona una puntuació " : language === "es" ? "Selecciona una puntuación " : "Select a score " }
                    </p>
                }

            <label className="block mt-3 font-semibold mb-2">
            {language === "ca" ? "Afegiu URL de imatges " : language === "es" ? "Agrega URL de imágenes" : "Add image URL " }
                 (opcional):
                <span className="text-green-700 font-semibold pl-3">
                    {imageMessage ? 
                        language === "ca" ? "Imatge carregada correctament, afegeix una altre." 
                        : language === "es" ? "Imágen agregada correctamente,agrega otra." 
                        : language === "en" ? "Image added correctly, add another one. "
                        :"" 
                        : ""   
                    }
                </span>
                <span className="text-red-500 font-semibold">
                    {isURLError ? 
                        language === "ca" ? "No s'ha indroduït una URL vàlida o té més de 100 caracters" 
                        : language === "es" ? "No se ha introducido una URL válida o tiene más de 100 caracteres" 
                        : language === "en" ? "A valid URL has not been entered or is longer than 100 characters"
                        : "" 
                        :""   
                    }
                </span>
            </label>
            <input 
                className="block p-2 w-full text-gray-900 border border-gray-700 rounded-lg bg-white"
                type="text"
                value={imagesURL}
                onChange={(e) => setImagesURL(e.target.value)}
            />

            <button
                type="button"
                className={` border bg-green-600 text-white p-2 rounded-full mt-3 px-5 block ${
                loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-white hover:text-green-700"
                }`}
                onClick={handleImageURL}  
            >
                {language === "ca" ? "Afegir imatge" : language === "es" ? "Agregar imagen" : "Add image" }  
            </button> 

            <button
                className={`border bg-green-600 text-white p-2 mt-3 mx-auto px-5 rounded-full  block ${
                loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-white hover:text-green-700"
                }`}
                
            >
                {loading && !isPuntuacio ? 
                    language === "ca" ? "Enviar..." : language === "es" ? "Enviar..." : "Sending..." 
                    : 
                    language === "ca" ? "Enviar" : language === "es" ? "Enviar" : "Send"
                }
            </button>  

            {error && <p className="text-red-500 mt-3">{error}</p>} 
            {message && <p className="text-green-800 font-semibold mt-3">
                <span className="font-bold text-xl flex">
                {language === "ca" ? "¡¡ Comentari enviat amb èxit !!" : language === "es" ? "¡¡ Comentario enviado con éxito !!" : "¡¡ Comment sent successfully !!" }
                    
                    <FaRegSmileBeam className="text-3xl text-yellow-500 pl-1" />
                </span>
                <br />  
                {language === "ca" ? "En breu serà revisat i publicat." : language === "es" ? "En breve será revisado y publicado" : "Soon to be revised and published" } 
                
            </p>} 
        </form>

    )
}