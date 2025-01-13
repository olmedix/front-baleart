import { useState } from "react";
import { fetchComments } from "../services/api";
import { FaRegSmileBeam } from "react-icons/fa";

export default function AddComment({ regNumber }) {

    const [puntuacio, setPuntuacio] = useState(0);
    const [isPuntuacio, setIsPuntuacio] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(false);
    const [error, setError] = useState(null);
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

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setComentari((prev) => ({
          ...prev,
          images: files,
        }));
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
          } catch (err) {
            setError(err.message || "Error al enviar el comentario.");
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

            <label className="block mt-3 font-semibold mb-2">Afegiu imatges (opcional):</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-700 rounded-lg cursor-pointer bg-white"
                type="file" multiple onChange={handleImageUpload} />

            <button
                className={`border bg-green-600 text-white p-2 rounded-full mt-3 px-5 block ${
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