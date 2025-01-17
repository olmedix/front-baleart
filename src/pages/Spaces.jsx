import { useState,useEffect } from "react";
import { fetchModalities, fetchMunicipalities, fetchServices, fetchSpaceTypes} from "../services/api";
import { SpacesContext } from "../contexts/SpacesContext";
import { useContext } from "react";

import CardList from "../components/CardList";

export default function Spaces(){

    const { spaces, loading, error } = useContext(SpacesContext);
    const [loadingMunicipality, setLoadingMunicipality] = useState(true);
    const [loadingSpaceType, setLoadingSpaceType] = useState(true);
    const [loadingService, setLoadingService] = useState(true);
    const [loadingModality, setLoadingModality] = useState(true);

    const [errorMunicipality, setErrorMunicipality] = useState(null);
    const [errorSpaceType, setErrorSpaceType] = useState(null);
    const [errorService, setErrorService] = useState(null);
    const [errorModality, setErrorModality] = useState(null);

    const [filters, setFilters] = useState({
        name: "",
        spaceType: "",
        municipality: "",
        score: "",
        modality: [],
        service: [],
    });
    //const typeSpaces = ["Museu","Galeria","Sala d’exposicions","Centre Cultural","Seu Institucional","Hotel","Palau","Refugi","Casal","Església","Biblioteca","Teatre","Apartament","Habitatge Unifamiliar","Oficina","Club Esportiu","Castell","Jardins","Hospital","Cementiri","Parc","Piscina","Barri","Passatge","Far"];
    //const modalities = ["Pintura", "Escultura", "Fotografia", "Videoart", "Grafiti", "Instal·lació", "Performance", "Teixits", "Joies", "Il·lustració", "Música", "Vídeo", "Estampació", "Vidre"];
    //const services = ["Adaptat discapacitats","Admet mascotes","Aire condicionat","Biblioteca","Arxiu","Tallers","Cafeteria","Aparcament","Concerts","Visites concertades","Wifi","Conferències","Teatre","Banys","Guia"];  
    const [municipalities,setMunicipalities] = useState([]);
    const [spacesTypes,setSpaceTypes] = useState([]);
    const [modalities,setModalities] = useState([]);
    const [services,setServices] = useState([]);

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
        const loadSpaceTypes = async () => {
            try {
                const data = await fetchSpaceTypes();
                setSpaceTypes(data); 
                console.log("SpaceType: "+data);
            } catch (error) {
                setErrorSpaceType(error.message);
            } finally {
                setLoadingSpaceType(false);
            }
        };
        loadSpaceTypes();
    }, []);

    useEffect(() => {
        const loadService = async () => {
            try {
                const data = await fetchServices();
                setServices(data); 
                console.log("Sercios: "+data);
            } catch (error) {
                setErrorService(error.message);
            } finally {
                setLoadingService(false);
            }
        };
        loadService();
    }, []);

    useEffect(() => {
        const loadModality = async () => {
            try {
                const data = await fetchModalities();
                setModalities(data); 
                console.log("modalidades: "+data);
            } catch (error) {
                setErrorModality(error.message);
            } finally {
                setLoadingModality(false);
            }
        };
        loadModality();
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
        const { name, spacesType, municipality, score, modality, service } = filters;
    
        // Filtrar por texto
        const matchesTextFilters = 
            (!name || space.nombre.toLowerCase().includes(name.toLowerCase())) &&
            (!spacesType || space.tipo_espacio.nombre === spacesType) &&
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
    

    
    if (loading || loadingMunicipality || loadingSpaceType || loadingModality || loadingService) return <p>Loading...</p>;
    if (error || errorMunicipality || errorSpaceType || errorModality || errorService) {
        return (
            <p>
                {error ? `Error loading spaces: ${error}` : ""}
                {errorMunicipality ? `Error loading municipalities: ${errorMunicipality}` : ""}
                {errorSpaceType ? `Error loading space types: ${errorSpaceType}` : ""}
                {errorModality ? `Error loading modalities: ${errorModality}` : ""}
                {errorService ? `Error loading services: ${errorService}` : ""}
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

                <label className="pr-3" htmlFor="municipality">Municipis
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
            {/*----------------------------------------------------------------------------------- */}
                <div className="mb-5">

                    <label className="pr-8" htmlFor="spaceType">Tipus d&apos;espai
                        <select
                            className="ml-3 rounded-lg p-0.5"
                            id="spaceType"
                            value={filters.spaceType}
                            onChange={(e) => handleFilterChange("spaceType", e.target.value)}
                        >
                            {<option value="">Tots</option>}
                            {spacesTypes.map((spaceType) => (

                                    <option key={spaceType} value={spaceType}>
                                        { spaceType}
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