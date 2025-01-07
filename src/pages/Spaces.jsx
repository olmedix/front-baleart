import { useState,useEffect } from "react";
import { fetchMunicipalities, fetchSpaces } from "../services/api";

import CardList from "../components/CardList";

export default function Spaces(){

    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingMunicipality, setLoadingMunicipality] = useState(true);
    const [errorMunicipality, setErrorMunicipality] = useState(null);

    const [filters, setFilters] = useState({
        name: "",
        typeSpace: "",
        municipality: "",
        score: "",
        modality: [],
        service: [],
    });
    const typeSpaces = ["Museu","Galeria","Sala d’exposicions","Centre Cultural","Seu Institucional","Hotel","Palau","Refugi","Casal","Església","Biblioteca","Teatre","Apartament","Habitatge Unifamiliar","Oficina","Club Esportiu","Castell","Jardins","Hospital","Cementiri","Parc","Piscina","Barri","Passatge","Far"];
    const modalities = ["Pintura", "Escultura", "Fotografia", "Videoart", "Grafiti", "Instal·lació", "Performance", "Teixits", "Joies", "Il·lustració", "Música", "Vídeo", "Estampació", "Vidre"];
    const services = ["Adaptat discapacitats","Admet mascotes","Aire condicionat","Biblioteca","Arxiu","Tallers","Cafeteria","Aparcament","Concerts","Visites concertades","Wifi","Conferències","Teatre","Banys","Guia"];  
    const [municipalities,setMunicipalities] = useState([]);

    useEffect(() => {
        const loadMunicipalities = async () => {
            try {
                const data = await fetchMunicipalities();
                // Extrae los nombres de los municipios
                setMunicipalities(data.map((municipality) => municipality.name)); 
            } catch (error) {
                setErrorMunicipality(error.message);
            } finally {
                setLoadingMunicipality(false);
            }
        };
        loadMunicipalities();
    }, []);

    useEffect(() => {

        const loadSpaces = async () => {
            try {
                const data = await fetchSpaces();
                console.log(data);
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

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => {
            const currentValues = prevFilters[filterType] || [];
            if (currentValues.includes(value)) {
                return {
                    ...prevFilters,
                    [filterType]: currentValues.filter((item) => item !== value),
                };
            } else {
                return {
                    ...prevFilters,
                    [filterType]: [...currentValues, value],
                };
            }
        });
    };
    

    const filterspace = spaces.filter((space) => {
        return (
            (!filters.name || space.nombre?.toLowerCase().includes(filters.name.toLowerCase())) &&
            (filters.typeSpace ? space.tipo_espacio.name === filters.typeSpace : true) &&
            (filters.municipality ? space.direccion.municipio === filters.municipality : true) &&
            (filters.score ? space.puntuacion_total === parseInt(filters.score) : true) &&
            (filters.modality.length === 0 || filters.modality.every((modality) => 
                space.modalidades.some((s) => s.nombre === modality))) &&
            (filters.service.length === 0 || filters.service.every((service) => 
                space.servicios.some((s) => s.nombre === service)
            ))
            
        );
    });

    
    if (loading || loadingMunicipality) return <p>Loading...</p>;
    if (error || errorMunicipality) {
        return (
            <p>
                {error ? `Error loading spaces: ${error}` : `Error loading municipalities: ${errorMunicipality}`}
            </p>
        );
    }

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

                <label htmlFor="typeSpace">Municipis
                    <select
                        id="municipality"
                        value={filters.municipality}
                        onChange={(e) => handleFilterChange("municipality", e.target.value)}
                    >
                        {<option value="">Tots</option>}
                        {municipalities?.map((municipality) => (
                                
                                <option key={municipality} value={municipality}>
                                    { municipality}
                                </option>
                            ))
                        }
                    </select>
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

                <label htmlFor="score">Puntuació
                    <select
                        id="score"
                        value={filters.score}
                        onChange={(e) => handleFilterChange("score", e.target.value)}
                    >
                        {<option value="">Tots</option>}
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
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
                                    onChange={() => handleFilterChange("modality",modality)}
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
                                    onChange={() => handleFilterChange("service",service)}
                                />
                                {service}
                            </label>
                        ))}
                </fieldset>
            </form>

            <CardList spaces={filterspace} />
      
         </>
    )
}