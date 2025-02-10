import { useContext, useState } from 'react';
import { SpacesContext } from '../contexts/SpacesContext';
import { ShowComment } from '../components/ShowComment';
import { useLanguage } from "../contexts/LanguageContext";
import { FlapperSpinner } from '../spinner/FlapperSpinner';


export default function Comments(){

    const { language } = useLanguage();
    const [pagination,setPagination] = useState(1); 
    const { spaces,loading } = useContext(SpacesContext);
    const spacesWithCommentsCount = spaces.filter(space => space.comentarios && space.comentarios.length > 0).length;

    if(loading) {
        return ( 
            <div className='flex w-full h-screen mt-20 justify-center'>
              <FlapperSpinner size={60} color="#16A34A" />
            </div>
          );
    }
   
    return(
        <div className="bg-gray-800 mt-8 p-12 flex flex-col items-center rounded-tl-3xl rounded-tr-3xl ">
            <h2 className='text-5xl font-bold text-green-700 text-center my-8 px-32'>
                {
                    language === "ca" 
                    ? "Tots els comentaris dels usuaris" 
                    : language === "es" 
                    ? "Todos los comentarios de los usuarios" 
                    : "All users comments" 
                }
            </h2>

            {spaces.slice(0,pagination).map((space) => (
                (space.comentarios && space.comentarios.length > 0) &&
                <div 
                    key={space.id}
                    style={{maxWidth: '900px'}}
                    className="w-full bg-slate-400 rounded-2xl mb-14 px-10  shadow-offset shadow-md shadow-white"
                >
                    <h3 className='text-4xl text-white font-bold pt-5'>{space.nombre}</h3>
                    <ShowComment space={space}/>
                </div>

            ))}

            {pagination < spacesWithCommentsCount && (
                <button
                    className="bg-green-600 text-white text-600 mt-3 py-2 px-5 rounded-full border-2 border-white font-semibold transition duration-400 ease-in-outhover:text-white hover:bg-green-900" 
                    
                    onClick={() => setPagination(pagination + 1)}>
                        {
                            language === "ca" 
                            ? "Següent Espai" 
                            : language === "es" 
                            ? "Siguiente Espacio" 
                            : "Next Space" 
                        }
                </button> 
            )}
        </div>
    )
}

