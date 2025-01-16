import Card from "./Card";

import { useState } from "react";

export default function CardList({ spaces }) {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Calcular los índices para la paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = spaces.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(spaces.length / itemsPerPage);

    // Cambiar página
    const handlePageChange = (direction) => {
        if (direction === "next" && currentPage < totalPages) {
          setCurrentPage((prevPage) => prevPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
          setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="bg-gray-800 p-8 flex flex-col items-center">
            {currentItems.map((space) => (
                    <Card
                        key={space.id}
                        id={space.id}
                        regNumber= {space.numero_registro}
                        typeSpace={space.tipo_espacio.name}
                        name={space.nombre}
                        municipality={space.direccion.municipio}
                        photo={"/baluard.jpg"}
                        modalities={space.modalidades.map( modality => modality.nombre)}
                        score={space.puntuacion_total}
                        votes={space.votos_totales}
                        comentarios={space.comentarios}
                        description ={[space.observacion_ca, space.observacion_es, space.observacion_en]}
                        services={space.servicios}
                    />
                ))
            }

            <div>
                <button 
                    className= {currentPage === 1 ?
                        "bg-gray-500 text-gray-200 mt-3 py-2 px-5 rounded-full mr-2 font-semibold ": 
                        "bg-white mt-3 py-2 px-5 rounded-full mr-2 font-semibold transition duration-400 ease-in-out hover:bg-green-700 hover:text-white"   
                    }
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 1}
                >
                    Anterior
                </button>
                <button
                    className= {currentPage === totalPages ?
                        "bg-gray-500 text-gray-200 mt-3 py-2 px-5 rounded-full mr-2 font-semibold ":
                        "bg-white mt-3 py-2 px-5 rounded-full font-semibold transition duration-400 ease-in-out hover:bg-green-700 hover:text-white"
                    }
                    onClick={() => handlePageChange("next")}
                    disabled={currentPage === totalPages}
                >
                    Següent
                </button>
            </div>
        </div>
    );
}
