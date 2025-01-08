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
            // Si el filtro es un array (como `modality` o `service`), actualízalo correctamente
            if (Array.isArray(prevFilters[filterType])) {
                const currentValues = prevFilters[filterType];
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
            }
    
            // Para filtros de texto o selección única
            return {
                ...prevFilters,
                [filterType]: value,
            };
        });
    };
    
    

    const filterspace = spaces.filter((space) => {
        const { name, typeSpace, municipality, score, modality, service } = filters;
    
        // Filtrar por texto
        const matchesTextFilters = 
            (!name || space.nombre.toLowerCase().includes(name.toLowerCase())) &&
            (!typeSpace || space.tipo_espacio.nombre === typeSpace) &&
            (!municipality || space.direccion.municipio === municipality) &&
            (!score || space.puntuacion_total === parseInt(score));
    
        // Filtrar por arrays
        const matchesArrayFilters = 
            (modality.length === 0 || modality.every((modalityItem) =>
                space.modalidades.some((s) => s.nombre === modalityItem))) &&
            (service.length === 0 || service.every((serviceItem) =>
                space.servicios.some((s) => s.nombre === serviceItem)
            ));
    
        return matchesTextFilters && matchesArrayFilters;
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
            <form className="mt-8 p-5 font-semibold bg-gray-400 rounded-tl-lg rounded-tr-lg">

                <div className="mb-5">

                <label className="pr-8" htmlFor="name">
                    Nom
                <input
                    className="ml-3 rounded-lg p-0.5"
                    type="text"
                    id="name"
                    value={filters.name}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                />
                </label>

                <label className="pr-3" htmlFor="typeSpace">Municipis
                    <select
                        className="ml-3 rounded-lg p-0.5"
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

                </div>

                <div className="mb-5">

                <label className="pr-8" htmlFor="typeSpace">Tipus d&apos;espai
                    <select
                        className="ml-3 rounded-lg p-0.5"
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
                        className="ml-3 rounded-lg p-0.5"
                        id="score"
                        value={filters.score}
                        onChange={(e) => handleFilterChange("score", e.target.value)}
                    >
                        {<option value="">Tots</option>}
                        <option value="1">1 estrella</option>
                        <option value="2">2 estrella</option>
                        <option value="3">3 estrella</option>
                        <option value="4">4 estrella</option>
                        <option value="5">5 estrella</option>
                    </select>
                </label>

                </div>

                <fieldset className="mb-5 pb-3 border-2 border-black rounded-lg">
                    <legend className="text-xl px-1">Modalitats</legend>
                    <div className="grid grid-cols-4 gap-4 pl-5">
                        {
                        modalities.map( modality => (
                            <label key={modality} className="flex items-center">
                                <input
                                    className="mr-1"
                                    type="checkbox"
                                    value={modality}
                                    checked={filters.modality.includes(modality)}
                                    onChange={() => handleFilterChange("modality",modality)}
                                />
                                {modality}
                            </label>
                        ))}
                    </div>
                </fieldset>

                <fieldset className="mb-5 pb-3 border-2 border-black rounded-lg">
                    <legend className="text-xl px-1">Serveis</legend>
                    <div className="grid grid-cols-4 gap-4 pl-5">
                    {
                        services.map( service => (
                            <label key={service} className="flex items-center">
                                <input
                                    className="mr-1"
                                    type="checkbox"
                                    value={service}
                                    checked={filters.service.includes(service)}
                                    onChange={() => handleFilterChange("service",service)}
                                />
                                {service}
                            </label>
                        ))}
                    </div>
                </fieldset>
            </form>

            <CardList spaces={filterspace} />
      
         </>
    )
}