import { useContext, useState } from 'react';
import { SpacesContext } from '../contexts/SpacesContext';
import { ShowComment } from '../components/ShowComment';
import { useLanguage } from "../contexts/LanguageContext";

export default function Comments(){

    const { language } = useLanguage();
    const [pagination,setPagination] = useState(1); 
    const { spaces } = useContext(SpacesContext);
    const spacesWithCommentsCount = spaces.filter(space => space.comentarios && space.comentarios.length > 0).length;
   
    return(
        <div className="bg-gray-800 mt-8 p-12 flex flex-col items-center rounded-tl-3xl rounded-tr-3xl ">
            <h2 className='text-5xl text-green-700 font-bold py-7 shadow-xl text-shadow'>
                {
                    language === "ca" 
                    ? "Tots els comentaris dels usuaris" 
                    : language === "es" 
                    ? "Todos los comentarios de los usuarios" 
                    : "All users comments" 
                }
            </h2>

            {spaces.slice(0,pagination).map((space,index) => (
                (space.comentarios && space.comentarios.length > 0) &&
                <div 
                    key={space.id}
                    className={`${index % 2 === 0 ? 'bg-gray-500' : 'bg-gray-400'} 
                    rounded-2xl mb-14 px-10  shadow-offset shadow-xl shadow-white`}
                >
                    <h3 className='text-4xl text-white font-bold pt-5'>{space.nombre}</h3>
                    <ShowComment space={space}/>
                </div>

            ))}

            {pagination < spacesWithCommentsCount && (
                <button
                    className='bg-green-500 text-xl text-white font-semibold rounded-lg p-2 mb-8' 
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

