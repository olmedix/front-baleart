import { useState,useEffect } from "react";
import { fetchSpaces } from "../services/api";

import CardList from "../components/CardList";

export default function Spaces(){

    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        name: "",
        typeSpace: "",
        modality: "",
        service: "",
        municipality: "",
        score: "",
    });
    const typeSpaces = ["Museu","Galeria","Sala d’exposicions","Centre Cultural","Seu Institucional","Hotel","Palau","Refugi","Casal","Església","Biblioteca","Teatre","Apartament","Habitatge Unifamiliar","Oficina","Club Esportiu","Castell","Jardins","Hospital","Cementiri","Parc","Piscina","Barri","Passatge","Far"];
    const modalities = ["Pintura", "Escultura", "Fotografia", "Videoart", "Grafiti", "Instal·lació", "Performance", "Teixits", "Joies", "Il·lustració", "Música", "Vídeo", "Estampació", "Vidre"];
    const services = ["Adaptat discapacitats","Admet mascotes","Aire condicionat","Biblioteca","Arxiu","Tallers","Cafeteria","Aparcament","Concerts","Visites concertades","Wifi","Conferències","Teatre","Banys","Guia"];  


    useEffect(() => {

        const loadSpaces = async () => {
            try {
                const data = await fetchSpaces();
                const sortData = data.sort((a, b) => b.puntuacion_total - a.puntuacion_total);
                setSpaces(sortData);
            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };

        loadSpaces();
    }, []);

    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;

    return(
        <>
            <h1>Spais</h1>

            <form>
                <label htmlFor="name">
                    Nom
                <input
                    type="text"
                    id="name"
                    value={filters.name}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                />
                </label>

                <label htmlFor="typeSpace">Tipus d&apos;espai
                    <select
                        id="typeSpace"
                        value={filters.typeSpace}
                        onChange={(e) => handleFilterChange("typeSpace", e.target.value)}
                    >
                        {<option value="">Tots</option>}
                        {typeSpaces.map((typeSpace) => (
                                
                                <option key={typeSpace} value={typeSpace}>
                                    { typeSpace}
                                </option>
                            ))
                        }
                    </select>
                </label>

                <fieldset>
                    <legend>Modalitats:</legend>
                    {
                        modalities.map( modality => (
                            <label key={modality}>
                                <input
                                    type="checkbox"
                                    value={modality}
                                    checked={filters.modality.includes(modality)}
                                    onChange={() => handleCategoryChange(modality)}
                                />
                                {modality}
                            </label>
                        ))}
                </fieldset>

                <fieldset>
                    <legend>Serveis:</legend>
                    {
                        services.map( service => (
                            <label key={service}>
                                <input
                                    type="checkbox"
                                    value={service}
                                    checked={filters.service.includes(service)}
                                    onChange={() => handleCategoryChange(service)}
                                />
                                {service}
                            </label>
                        ))}
                </fieldset>
            </form>

            <CardList spaces={spaces} />
      
         </>
    )
}