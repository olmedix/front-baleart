import { useState,useEffect } from "react";
import { fetchSpaces } from "../services/api";

import CardList from "../components/CardList";

export default function Spaces(){

    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const loadSpaces = async () => {

            try {
                const data = await fetchSpaces();
                setSpaces(data);
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

            <CardList spaces={spaces} />
      
         </>
    )
}