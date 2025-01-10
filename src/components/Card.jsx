import { NavLink } from "react-router-dom";

export default function Card({ typeSpace,name,municipality,photo,modalities,score,votes,id,comments }) {

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <i key={i} className={` ${i < score ? 'fa-solid fa-star' : 'fa-regular fa-star'}`} />
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

    // Reconstruimos para enviar a la página de detalles
    const space = { typeSpace, name, municipality, photo, modalities, score, votes, id, comments };

    return (
        <article className="w-4/5 py-5 my-5 bg-slate-400 shadow-offset shadow-xl shadow-white rounded-2xl items-center justify-center">
            <section className="w-4/5 mx-auto relative">
                <div className="my-1 py-5 ">
                <img
                    className="rounded-2xl shadow-lg shadow-green-800" 
                    src={photo} 
                    alt={name} />
                </div>
                
                <div className="absolute top-5 left-0 bg-transparent text-left text-white p-2">
                    <p>{typeSpace}</p>
                    <h3>{name}</h3>
                    <p>{municipality}</p>
                </div>
            </section>

            <section className="flex w-4/5 mx-auto font-bold">

                <div className="ml-3">
                    <ul className="text-left">
                        <li>
                            Tipus de espai: <span className="font-normal">{typeSpace}</span> 
                        </li>
                        <li>
                            Nom: <span className="font-normal">{name}</span>
                        </li>
                        <li>
                            Municipi: <span className="font-normal">{municipality}</span>
                        </li>
                        <li>
                            <ul className="flex gap-2 ">
                                Modalitats:
                                    {modalities.map((modality) => (

                                        <li key={modality}>
                                            {renderModalities(modality)}
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    </ul>
                </div>

                <div className="ml-auto text-right mr-2">
                    <p 
                        className="text-green-800 whitespace-nowrap">{renderStars()} 
                    </p>
                    
                    <p className="pl-2 text-green-800">
                        <i className="fa-solid fa-hashtag text-xl mr-1"></i>
                            {votes} 
                            {votes === 1 ? "vot": "vots"}
                    </p>

                    <div>
                        <NavLink 
                            to={`/spaces/${id}`}
                            state={{space}} 
                            className="m-auto mt-5 block bg-green-600 text-white px-4 py-2 rounded-lg hover:text-white hover:bg-green-900 transition duration-300"
                        >Més informació
                        </NavLink>
                    </div> 
                    
                </div>

            </section>

            
        </article>
    );
    }