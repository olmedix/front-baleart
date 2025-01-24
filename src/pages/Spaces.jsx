import { useState } from "react";
import { SpacesContext } from "../contexts/SpacesContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useContext } from "react";

import CardList from "../components/CardList";
import { FiltersContext } from "../contexts/FiltersContext";


export default function Spaces(){

    const { language } = useLanguage();
    const { spaces, loading, error } = useContext(SpacesContext);
    const {filtros,loadingFilters,errorFilters} = useContext(FiltersContext);
    const [filters, setFilters] = useState({
        name: "",
        typeSpace: "",
        municipality: "",
        score: "",
        modality: [],
        service: [],
    });
    const [showModalities, setShowModalities] = useState(false);
    const [showServices, setShowServices] = useState(false);

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
    

    
    if (loading || loadingFilters) return <p>Loading...</p>;
    if (error || errorFilters) {
        return (
            <p>
                {error ? error : errorFilters}
            </p>
        );
    }

    return(
        <>
            <form className="mt-8 p-5 font-semibold bg-gray-800 text-white rounded-tl-lg rounded-tr-lg">

                <div className="mb-5">

                <label className="pr-8 text-green-600" htmlFor="name">
                {language === "ca" ? "Nom " : language === "es" ? "Nombre " : "Name " }
                <input
                    className="ml-3 rounded-lg p-0.5 text-black"
                    type="text"
                    id="name"
                    value={filters.name}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                />
                </label>

                <label className="pr-3 text-green-600" htmlFor="typeSpace">
                {language === "ca" ? "Municipi " : language === "es" ? "Municipio " : "Municipality " }
                    <select
                        className="ml-3 rounded-lg p-0.5 text-black"
                        id="municipality"
                        value={filters.municipality}
                        onChange={(e) => handleFilterChange("municipality", e.target.value)}
                    >
                        {<option value="">
                            {language === "ca" ? "Tots " : language === "es" ? "Todos " : "All " }
                        </option>}
                        {filtros.municipalities.map((municipality) => (
                                
                                <option key={municipality.id} value={municipality.name}>
                                    { municipality.name}
                                </option>
                            ))
                        }
                    </select>
                </label>

                </div>

                <div className="mb-5">

                <label className="pr-8 text-green-600" htmlFor="typeSpace">
                {language === "ca" ? "Tipus d'espai " : language === "es" ? "Tipo de espacio " : "Type of space " }
                    <select
                        className="ml-3 rounded-lg p-0.5 text-black"
                        id="typeSpace"
                        value={filters.typeSpace}
                        onChange={(e) => handleFilterChange("typeSpace", e.target.value)}
                    >
                        {<option value="">
                            {language === "ca" ? "Tots " : language === "es" ? "Todos " : "All " }
                        </option>}
                        {filtros.spaceTypes.map((spaceType) => (
                                
                                <option key={spaceType.id} value={spaceType.name}>
                                    { spaceType[`description_${language.toUpperCase()}`]}
                                </option>
                            ))
                        }
                    </select>
                </label>

                <label htmlFor="score" className="pr-3 text-green-600">
                    {language === "ca" ? "Puntuació " : language === "es" ? "Puntuación " : "Score " }
                    <select
                        className="ml-3 rounded-lg p-0.5 text-black"
                        id="score"
                        value={filters.score}
                        onChange={(e) => handleFilterChange("score", e.target.value)}
                    >
                        <option value="">
                            {language === "ca" ? "Tots " : language === "es" ? "Todos " : "All "}
                        </option>
                        {[...Array(5)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1} {language === "ca" ? "estrella" : language === "es" ? "estrella" : "star"}
                            </option>
                        ))}
                    </select>
                </label>

                </div>

                <section className="flex items-center justify-center gap-12">
                    <div 
                        className="text-green-600 text-xl px-1 relative -bottom-1"
                        onMouseEnter={() => setShowModalities(true)}
                        onMouseLeave={() => setShowModalities(false)}    
                    >
                        <span className={showModalities ? "text-white" : "text-green-600"}>
                        {language === "ca" ? "Modalitats" : language === "es" ? "Modalidades" : "Modalities"}
                        </span>
                        
                    </div>

                    <div 
                        className="text-green-600 text-xl px-1 relative -bottom-1"
                        onMouseEnter={() => setShowServices(true)}
                        onMouseLeave={() => setShowServices(false)} 
                    >
                        <span className={showServices ? "text-white" : "text-green-600"}>
                            {language === "ca" ? "Serveis" : language === "es" ? "Servicios" : "Services"}
                        </span>
                    </div>
                </section>
                    
                    { showModalities &&
                        <div 
                            className="grid grid-cols-4 gap-4 pl-5 pt-5"
                            onMouseEnter={() => setShowModalities(true)}
                            onMouseLeave={() => setShowModalities(false)} 
                        >
                            {
                            filtros.modalities.map( modality => (
                                <label key={modality.id} className="flex items-center">
                                    <input
                                        className="mr-1"
                                        type="checkbox"
                                        value={modality.name}
                                        checked={filters.modality.includes(modality.name)}
                                        onChange={() => handleFilterChange("modality",modality.name)}
                                    />
                                    { modality[`description_${language.toUpperCase()}`]}
                                </label>
                            ))}
                        </div>
                    }

                    { showServices &&
                    <div 
                        className="grid grid-cols-4 gap-4 pl-5 pt-5"
                        onMouseEnter={() => setShowServices(true)}
                        onMouseLeave={() => setShowServices(false)}
                    >
                    {
                        filtros.services.map( service => (
                            <label key={service.id} className="flex items-center">
                                <input
                                    className="mr-1"
                                    type="checkbox"
                                    value={service}
                                    checked={filters.service.includes(service.name)}
                                    onChange={() => handleFilterChange("service",service.name)}
                                />
                                { service[`description_${language.toUpperCase()}`]}
                            </label>
                        ))}
                    </div>
                    }              
            </form>

            <CardList spaces={filterspace} />
      
         </>
    )
}