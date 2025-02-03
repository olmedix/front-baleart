import { NavLink } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";

export default function Card({ typeSpace,name,municipality,photo,modalities,score,votes,id,comentarios,description,services,regNumber }) {

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <i key={i} className={` ${i < score ? 'fa-solid fa-star' : 'fa-regular fa-star'} p-1`} />
            );
        }
        return stars;
    };

    function renderModalities(modalitat){

        let imgModality = "/imgs/modalities/";

        switch(modalitat){
            case "Pintura":
                imgModality += "pintura.jpg";
                break;
            case "Escultura":
                imgModality += "escultura.jpg";
                break;
            case "Fotografia":
                imgModality += "fotografia.jpg";
                break;
            case "Videoart":
                imgModality += "videoArt.jpg";
                break;
            case "Grafiti":
                imgModality += "graffiti.jpg";
                break;
            case "Instal·lació":
                imgModality += "instalacion.jpg";
                break;
            case "Performance":
                imgModality += "performance.jpg";
                break;
            case "Teixits":
                imgModality += "tejidos.jpg";
                break;
            case "Joies":
                imgModality += "joyas.jpg";
                break;
            case "Il·lustració":
                imgModality += "ilustracion.jpg";
                break;
            case "Música":
                imgModality += "musica.jpg";
                break;
            case "Estampació":
                imgModality += "estampacion.jpg";
                break;
            case "Vidre":
                imgModality += "vidrio.jpg";
                break;
                case "Vídeo":
                    imgModality += "video.jpg";
                    break;
            default:
                return "Sense Modalitat";
        }

        return (
            <img 
                className="w-20 h-20 border-2 border-green-800 rounded-lg shadow-md shadow-green-500 " 
                src={imgModality}
                title={modalitat} 
                alt={modalitat} 
            />
        );

    }

    const { language } = useLanguage(); 

    // Reconstruimos para enviar a la página de detalles
    const space = { typeSpace, name, municipality, photo, modalities, score, votes, id, comentarios,description,services,regNumber };

    return (
        <article className="w-4/5 py-5 my-5 bg-slate-400 shadow-offset shadow-md shadow-white rounded-2xl items-center justify-center">
            <section className="w-4/5 mx-auto relative">
                <div className="my-1 py-5 ">
                <img
                    className="rounded-2xl shadow-lg shadow-green-800 w-full object-cover hover:scale-105 transition duration-300" 
                    src={photo} 
                    alt={name} />
                </div>
                
                <div className="absolute top-5 left-0 bg-transparent text-left text-white p-2 bg-white opacity-50 rounded-lg">
                    <p className="text-black text-sm font-bold">{
                        language === "ca" ? typeSpace[0] : language === "es" ? typeSpace[1] : typeSpace[2]    
                    }</p>
                    <h3 className="text-black text-sm font-bold">{name}</h3>
                    <p className="text-black text-sm font-bold">{municipality}</p>
                </div>
            </section>

            <section className="flex w-4/5 mx-auto font-bold">

                <div className="ml-3">
                    <ul className="text-left">
                        <li>
                        {language === "ca" ? "Tipus d'espai: " : language === "es" ? "Tipo de espacio: " : "Type of space: " }
                            <span className="font-normal">{
                                language === "ca" ? typeSpace[0] : language === "es" ? typeSpace[1] : typeSpace[2] 
                            }</span> 
                        </li>
                        <li>
                            {language === "ca" ? "Nom: " : language === "es" ? "Nombre: " : "Name: " } 
                            <span className="font-normal">{name}</span>
                        </li>
                        <li>
                            {language === "ca" ? "Municipi: " : language === "es" ? "Municipio: " : "Municipality: " }
                            <span className="font-normal">{municipality}</span>
                        </li>
                        <li>
                            <ul className="flex gap-2 ">
                                {language === "ca" ? "Modalitats: " : language === "es" ? "Modalidades: " : "Modalities: " }
                                
                                    {modalities.map((modality) => (

                                        <li key={modality.id}>
                                            {renderModalities(modality.nombre)}
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="ml-auto text-right mx-2">
                    <p 
                        className="text-green-800 whitespace-nowrap">{renderStars()} 
                    </p>
                    
                    <p className="pt-2 pl-2 text-green-800 ">
                        <span className="text-lg py-1 px-4 mr-1 bg-white bg-opacity-50 rounded-lg border-2 border-white">
                            {votes} 
                            {
                            votes === 1 ?
                                language === "ca" ? " vot" : language === "es" ? " voto" : " vote"
                                :
                                language === "ca" ? " vots" : language === "es" ? " votos" : " votes"
                            }
                            </span>
                    </p>

                    <div >
                        <NavLink 
                            to={`/spaces/${id}`}
                            state={{space}}
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
                            className="m-auto ml-2 mt-5 block bg-green-600 text-white px-4 py-2 rounded-full border-2 border-white hover:text-white hover:bg-green-900 transition duration-300"
                        >
                            {language === "ca" ? "Més informació " : language === "es" ? "Más información " : "More information " }
                        </NavLink>
                    </div> 
                    
                </div>

            </section>

            
        </article>
    );
    }