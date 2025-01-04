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
        municipality: "",
        score: "",
    });

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
                        <option value="">Tots</option>
                        <option value="Museu">Museu</option>
                        <option value="Galeria">Galeria</option>
                        <option value="Sala d’exposicions">Sala d’exposicions</option>
                        <option value="Centre Cultural">Centre Cultural</option>
                        <option value="Seu Institucional">Seu Institucional</option>
                        <option value="Hotel">Hotel</option>
                        <option value="Palau">Palau</option>
                        <option value="Refugi">Refugi</option>
                        <option value="Casal">Casal</option>
                        <option value="Església">Església</option>
                        <option value="Biblioteca">Biblioteca</option>
                        <option value="Teatre">Teatre</option>
                        <option value="Apartament">Apartament</option>
                        <option value="Habitatge Unifamiliar">Habitatge Unifamiliar</option>
                        <option value="Oficina">Oficina</option>
                        <option value="Club Esportiu">Club Esportiu</option>
                        <option value="Castell">Castell</option>
                        <option value="Jardins">Jardins</option>
                        <option value="Hospital">Hospital</option>
                        <option value="Cementiri">Cementiri</option>
                        <option value="Parc">Parc</option>
                        <option value="Piscina">Piscina</option>
                        <option value="Barri">Barri</option>
                        <option value="Passatge">Passatge</option>
                        <option value="Far">Far</option>
                    </select>
                </label>

                <fieldset>
                    <legend>Modalitats:</legend>

                    <label>
                        <input
                        type="checkbox"
                        value="Pintura"
                        checked={filters.modality.includes("Pintura")}
                        onChange={() => handleCategoryChange("Pintura")}
                        />
                        Pintura
                    </label>

                    <label>
                        <input
                        type="checkbox"
                        value="Escultura"
                        checked={filters.modality.includes("Escultura")}
                        onChange={() => handleCategoryChange("Escultura")}
                        />
                        Escultura
                    </label>

                    <label>
                        <input
                        type="checkbox"
                        value="Fotografia"
                        checked={filters.modality.includes("Fotografia")}
                        onChange={() => handleCategoryChange("Fotografia")}
                        />
                        Fotografia
                    </label>

                    <label>
                        <input
                        type="checkbox"
                        value="Videoart"
                        checked={filters.modality.includes("Videoart")}
                        onChange={() => handleCategoryChange("Videoart")}
                        />
                        Videoart
                    </label>

                    <label>
                        <input
                        type="checkbox"
                        value="Grafiti"
                        checked={filters.modality.includes("Grafiti")}
                        onChange={() => handleCategoryChange("Grafiti")}
                        />
                        Grafiti
                    </label>

                    <label>
                        <input
                        type="checkbox"
                        value="Instal·lació"
                        checked={filters.modality.includes("Instal·lació")}
                        onChange={() => handleCategoryChange("Instal·lació")}
                        />
                        Instal·lació
                    </label>

                    <label>
                        <input
                        type="checkbox"
                        value="Performance"
                        checked={filters.modality.includes("Performance")}
                        onChange={() => handleCategoryChange("Performance")}
                        />
                        Performance
                    </label>

                    <label>
                        <input
                        type="checkbox"
                        value="Teixits"
                        checked={filters.modality.includes("Teixits")}
                        onChange={() => handleCategoryChange("Teixits")}
                        />
                        Teixits
                    </label>

                    <label>
                        <input
                        type="checkbox"
                        value="Joies"
                        checked={filters.modality.includes("Joies")}
                        onChange={() => handleCategoryChange("Joies")}
                        />
                        Joies
                    </label>

                    <label>
                        <input
                        type="checkbox"
                        value="Il·lustració"
                        checked={filters.modality.includes("Il·lustració")}
                        onChange={() => handleCategoryChange("Il·lustració")}
                        />
                        Il·lustració
                    </label>

                    <label>
                        <input
                        type="checkbox"
                        value="Música"
                        checked={filters.modality.includes("Música")}
                        onChange={() => handleCategoryChange("Música")}
                        />
                        Música
                    </label>

                    <label>
                        <input
                        type="checkbox"
                        value="Vídeo"
                        checked={filters.modality.includes("Vídeo")}
                        onChange={() => handleCategoryChange("Vídeo")}
                        />
                        Vídeo
                    </label>

                    <label>
                        <input
                        type="checkbox"
                        value="Estampació"
                        checked={filters.modality.includes("Estampació")}
                        onChange={() => handleCategoryChange("Estampació")}
                        />
                        Estampació
                    </label>

                    <label>
                        <input
                        type="checkbox"
                        value="Vidre"
                        checked={filters.modality.includes("Vidre")}
                        onChange={() => handleCategoryChange("Vidre")}
                        />
                        Vidre
                    </label>

                </fieldset>
                

            </form>

            <CardList spaces={spaces} />
      
         </>
    )
}