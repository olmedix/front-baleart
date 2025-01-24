import Card from "./Card";

import { useState,useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

export default function CardList({spaces}) {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const { language } = useLanguage();

    // Calcular los índices para la paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = spaces.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(spaces.length / itemsPerPage);

    // Fotos
    const [photos, setPhotos] = useState([]);
    const [loadPhotos, setLoadPhotos] = useState(true);
    const [errorPhotos, setErrorPhotos] = useState(null);

    // Cambiar página
    const handlePageChange = (direction) => {
        if (direction === "next" && currentPage < totalPages) {
          setCurrentPage((prevPage) => prevPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
          setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const fetchPhotos = async () =>{
      
          try {
            setLoadPhotos(true);
              const response = await fetch('/spacesPhotos.json');
              const data = await response.json();
              setPhotos(data); 
          } catch (error) {
            setErrorPhotos("Error al cargar las fotos");
          }finally{
            setLoadPhotos(false);
          }
        }
        useEffect(() => {
            fetchPhotos();
      }, []);

      const searchPhoto = (space) => {
        const photo = photos.find((photo) => photo.registre === space.numero_registro);
        return photo.image ;
    };
    

      if (loadPhotos) return <p>Loading...</p>;
      if (errorPhotos) return <p>{errorPhotos}</p>;

    return (
        <div className="bg-gray-800 p-8 flex flex-col items-center">
            {currentItems.map((space) => (

                
                
                    <Card
                        key={space.id}
                        id={space.id}
                        regNumber= {space.numero_registro}
                        typeSpace={[space.tipo_espacio.description_ca,space.tipo_espacio.description_es,space.tipo_espacio.description_en]}
                        name={space.nombre}
                        municipality={space.direccion.municipio}
                        photo={searchPhoto(space)}  
                        modalities={space.modalidades}
                        score={space.puntuacion_total}
                        votes={space.votos_totales}
                        comentarios={space.comentarios}
                        description = {[space.observacion_ca,space.observacion_es,space.observacion_en]}
                        services={space.servicios}
                    />
                ))
            }

            <div>
                <button 
                    className= {currentPage === 1 ?
                        "bg-gray-500  text-gray-200 mt-3 py-2 px-5 rounded-full mr-2 font-semibold ": 
                        "bg-white text-green-600 mt-3 py-2 px-5 rounded-full mr-2 font-semibold transition duration-400 ease-in-out hover:bg-green-700 hover:text-white"   
                    }
                    onClick={() => {
                        handlePageChange("prev"); 
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                    disabled={currentPage === 1}
                >
                    {language === "ca" || language === "es" ? "Anterior " : "Before " }
                </button>
                <button
                    className= {currentPage === totalPages ?
                        "bg-gray-500  text-gray-200 mt-3 py-2 px-5 rounded-full mr-2 font-semibold ":
                        "bg-white text-green-600 mt-3 py-2 px-5 rounded-full font-semibold transition duration-400 ease-in-out hover:bg-green-700 hover:text-white"
                    }
                    onClick={() =>{ 
                        handlePageChange("next"); 
                        window.scrollTo({ top: 0, behavior: "smooth" }) 
                    }}
                    disabled={currentPage === totalPages}
                >
                    {language === "ca" ? "Següent " : language === "es" ? "Siguiente " : "Next " }
                </button>
            </div>
        </div>
    );
}
