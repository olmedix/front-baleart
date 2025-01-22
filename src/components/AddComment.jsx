import { useState } from "react";
import { fetchComments } from "../services/api";
import { FaRegSmileBeam } from "react-icons/fa";

export default function AddComment({ regNumber }) {

    const [puntuacio, setPuntuacio] = useState(0);
    const [isPuntuacio, setIsPuntuacio] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(false);
    const [imageMessage, SetImageMessage] = useState(false);
    const [error, setError] = useState(null);
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

    const handleImageURL = () => {
        setComentari(prev =>({ ...prev,images:[ ...prev.images, imagesURL.trim()]}));
        setImagesURL("");
        SetImageMessage(true);
        setTimeout(() => {
            SetImageMessage(false);
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (puntuacio === 0) {
            setIsPuntuacio(true);
            return;
        }else{
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
                Afegeix un comentari
            </label>
            <textarea 
                className="w-full border border-gray-700 p-2 rounded-lg" 
                placeholder="Escriu el teu comentari aquí..."
                value={comentari.comment}
                 required
                 onChange={(e) => setComentari({ ...comentari, comment: e.target.value })}    
             >
             </textarea>

            <label className="block mt-1 font-semibold">
                Valora aquest espai:
            </label>
            <p className="text-yellow-500 text-xl pl-3 cursor-pointer">{selectStars()}</p>
                {
                    isPuntuacio &&
                    <p className="text-red-500 font-semibold">Selecciona una puntuació</p>
                }

            <label className="block mt-3 font-semibold mb-2">Afegiu URL de imatges (opcional):
                <span className="text-green-700 font-semibold pl-3">
                    {imageMessage && "Imatge carregada correctament, afegeix una altre."}
                </span>
            </label>
            <input 
                className="block p-2 w-full text-gray-900 border border-gray-700 rounded-lg bg-white"
                type="text"
                placeholder="URL de la imatge"
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
                Afegir imatge
            </button> 

            <button
                className={`border bg-green-600 text-white p-2 mt-3 mx-auto px-5 rounded-full  block ${
                loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-white hover:text-green-700"
                }`}
                disabled={loading}
            >
                {loading ? "Enviant..." : "Enviar"}
            </button>  

            {error && <p className="text-red-500 mt-3">{error}</p>} 
            {message && <p className="text-green-800 font-semibold mt-3">
                <span className="font-bold text-xl flex">
                    ¡¡ Comentari enviat amb èxit!!
                    <FaRegSmileBeam className="text-3xl text-yellow-500 pl-1" />
                </span>
                <br />  
                En breu serà revisat i publicat.
            </p>} 
        </form>

    )
}