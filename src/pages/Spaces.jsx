import { useState,useEffect } from "react";
import { fetchModalities, fetchMunicipalities, fetchServices, fetchSpaceTypes} from "../services/api";
import { SpacesContext } from "../contexts/SpacesContext";
import { useContext } from "react";

import CardList from "../components/CardList";

export default function Spaces(){

    const { spaces, loading, error } = useContext(SpacesContext);
    const { language } = useLanguage();

    const [load,setLoad]=useState(false);
    const [error2, setError2] = useState(null);


    const [filters, setFilters] = useState({
        name: "",
        spaceType: "",
        municipality: "",
        score: "",
        modality: [],
        service: [],
    });
    const [filtros,setFiltros] = useState([]);

    useEffect(() => {
       
        const loadFiltros = async () => {
            
            try {
                const data = await fetchFilters();
                console.log(data);
                setFiltros(data); 
            } catch (error) {
                setErrorFilters(error.message);
            } finally {
                setLoadingFilters(false);
            }
      };
      
      useEffect(() => {
        fetchAllData();
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
        const { name, spaceType, municipality, score, modality, service } = filters;
    
        // Filtrar por texto
        const matchesTextFilters = 
            (!name || space.nombre.toLowerCase().includes(name.toLowerCase())) &&
            (!spaceType || space.tipo_espacio.nombre === spaceType) &&
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
    

    if(load || loading) return <p>Loading...</p>;
    if(error2) return <p>{error2}</p>;
    if(error) return <p>{error}</p>;

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

                                    <option key={spaceType.id} value={spaceType.name}>
                                        {spaceType[`description_${language.toUpperCase()}`]}  
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
                            <label key={modality.id} className="flex items-center">
                                <input
                                    className="mr-1"
                                    type="checkbox"
                                    value={modality.name}
                                    checked={filters.modality.includes(modality.name)}
                                    onChange={() => handleFilterChange("modality",modality.name)}
                                />
                                {modality[`description_${language.toUpperCase()}`]}
                            </label>
                        ))}
                    </div>
                </fieldset>

                <fieldset className="mb-5 pb-3 border-2 border-black rounded-lg">
                    <legend className="text-xl px-1">Serveis</legend>
                    <div className="grid grid-cols-4 gap-4 pl-5">
                    {
                        services.map( service => (
                            <label key={service.id} className="flex items-center">
                                <input
                                    className="mr-1"
                                    type="checkbox"
                                    value={service.name}
                                    checked={filters.service.includes(service.name)}
                                    onChange={() => handleFilterChange("service",service.name)}
                                />
                                {service[`description_${language.toUpperCase()}`]}
                            </label>
                        ))}
                    </div>
                </fieldset>
            </form>

            <CardList 
                spaces={filterspace} />
            </>
    )
}