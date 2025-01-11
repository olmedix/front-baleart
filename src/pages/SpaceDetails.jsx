import { useLocation} from "react-router-dom";


export default function SpaceDetails(){
    const location = useLocation();
    const { space } = location.state;

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <i key={i} className={` ${i < space.score ? 'fa-solid fa-star' : 'fa-regular fa-star'}`} />
            );
        }
        return stars;
    };
    
    return (
        <div className="bg-gray-800 p-8 flex flex-col items-center">
            <h1 className="text-white">{space.name} 
                <span className="pl-2 text-green-500 shadow-xl text-shadow" >
                    {space.score}
                    <i className="fa-solid fa-star "></i>
                </span> 
            </h1>

            <p className="w-4/5 p-5 my-5 text-left bg-slate-400 shadow-offset shadow-xl shadow-white rounded-xl">
                <span className="font-bold">Descripció: </span>  
                {space.description[0]}
            </p>

            <p className="w-4/5 p-5 my-5 text-left bg-slate-400 shadow-offset shadow-xl shadow-white rounded-xl">
                <span className="font-bold">Municipi: </span>  
                {space.municipality}
            </p>

            { space.description.length > 0 &&
                <ul className="w-4/5 p-5 my-5 text-left bg-slate-400 shadow-offset shadow-xl shadow-white rounded-xl">
                    <span className="font-bold">Serveis: </span>
                    {
                        space.services.map((service, index) => (
                            <li  className="ml-5" key={index}>{service.descripcion_ca} </li>
                        ))
                    }
                </ul>
            }

                <ul className="w-4/5 p-5 my-5 text-left bg-slate-400 shadow-offset shadow-xl shadow-white rounded-xl">
                <span className="font-bold">Modalitats: </span>
                    {space.modalities.map((modality, index) => (
                        <li className="ml-5" key={index}>{modality}</li>
                    ))}
                </ul>
            
            <section className="w-4/5 p-5 my-5 text-left bg-slate-400 shadow-offset shadow-xl shadow-white rounded-xl">
                <h4 className="font-bold">Comentaris:</h4>
                {space.comments.map((comentario, index) => (

                    <div key={index}
                         className="flex p-5 my-5 text-left rounded-xl"
                    >
                        <div className="px-7 font-semibold flex flex-col items-center justify-center">
                            <p className="rounded-full p-2 text-white bg-green-600 border border-green-700 w-12 h-12 flex items-center justify-center">
                                {comentario.usuario.charAt(0).toUpperCase()}
                            </p>
                            <p className="">
                                {comentario.usuario}  
                            </p>

                            <p className="whitespace-nowrap">{renderStars()}</p>
                        </div>

                        <div>
                        <p className="text-gray-700">
                            <span>Data del comentari: </span> 
                            {new Date(comentario.fecha_creacion).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>

                        <p className="font-bold text-xl mb-4">{comentario.comentario}</p>

                        <div className="flex box-border gap-2">
                            { comentario.imagenes.length > 0 &&
                                comentario.imagenes.map((imagen, index) => (
                                    <img 
                                        key={index} 
                                        src={imagen.url_imagen} 
                                        alt={(comentario.usuario)}
                                        onError={(e) => { 
                                            e.target.onerror = null;
                                            e.target.src = "/imgs/modalities/escultura.jpg";
                                        }}
                                    />
                                ))
                            }
                        </div>

                        </div>

  
                    </div>
                ))}
            </section>
            

            
            
        </div>
    );
}