import { useLocation} from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { ShowComment } from "../components/ShowComment";
import AddComment from "../components/AddComment";

export default function SpaceDetails(){
    const location = useLocation();
    const { space } = location.state;
    const { language } = useLanguage(); 

    return (
        <div className="bg-gray-800 mt-8 p-6 flex flex-col items-center rounded-tl-3xl rounded-tr-3xl "
             style={{minWidth: "1100px"}}
        >

            <h1 className="text-white">{space.name} 
                <span className="pl-2 text-green-500 shadow-xl text-shadow" >
                    {space.score}
                    <i className="fa-solid fa-star "></i>
                </span> 
            </h1>

            <p className="w-4/5 p-5 my-5 text-left bg-slate-400 shadow-offset shadow-md shadow-white rounded-xl">
                <span className="font-bold">Descripció: </span> 
                {language === "ca" ? space.description[0] : language === "es" ? space.description[1] : space.description[2]   } 
            </p>

            <p className="w-4/5 p-5 my-5 text-left bg-slate-400 shadow-offset shadow-md shadow-white rounded-xl">
                <span className="font-bold">Municipi: </span>  
                {space.municipality}
            </p>

            { space.services.length > 0 &&
                <ul className="w-4/5 p-5 my-5 text-left bg-slate-400 shadow-offset shadow-md shadow-white rounded-xl">
                    <span className="font-bold">Serveis: </span>
                    <li></li>
                        {space.services.map((service, index) => (      
                            <li  className="ml-5" key={index}>{service[`descripcion_${language}`]} </li>
                        ))
                    }
                </ul>
            }
                <ul className="w-4/5 p-5 my-5 text-left bg-slate-400 shadow-offset shadow-md shadow-white rounded-xl">
                <span className="font-bold">Modalitats: </span>
                    {space.modalities.map((modality, index) => (
                        <li className="ml-5" key={index}>{modality[`descripcion_${language}`]}</li>
                    ))}
                </ul>
            
                <section className="w-4/5 p-5 my-5 text-left bg-slate-400 shadow-offset shadow-md shadow-white rounded-xl">
                                
                    <h4 className="font-bold">Comentaris:</h4>
                
                    <AddComment regNumber={space.regNumber}/>
                    <ShowComment space={space}/>
                </section>
        </div>
    );
}