import { useState } from "react";
import Navigation from "./Navigation";
import { useLanguage } from "../contexts/LanguageContext";

export default function Header(){

    const [hover,setHover] = useState(false);
    const { language, changeLanguage } = useLanguage();

    function handleLanguage (){
        if(language === "en") return "english.jpg";
        if(language === "es") return "spain.jpg";
        return "catalan.jpg";
    }

    return(
        <>
        <header className="flex justify-between">
            <div className="flex">
                <h1 className="text-green-900 font-bold  cursor-pointer hover:scale-110">
                    Baleart
                </h1>

                <img
                    className="h-7 pb-0.5 mr-6 mt-6 text-2xl pl-3 inline-block"  
                    src={"/imgs/language/" + handleLanguage()} 
                    alt="" 
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                />
            </div>
            <Navigation/>
        </header>
        
        { hover &&

        <ul className="-mt-1.5 ml-44 absolute cursor-pointer z-10"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
                <li className="flex items-center p-2 bg-green-500 opacity-50 rounded-t-lg font-semibold hover:bg-green-800 hover:text-white hover:opacity-100"
                    onClick={()=> changeLanguage('ca')}
                >
                    <img
                        className="w-7 h-5 mr-2 "  
                        src={"/imgs/language/catalan.jpg"} 
                        alt="" 
                    />
                    Català 
                </li>
                <li className="flex items-center p-2 bg-green-500 opacity-50 font-semibold hover:bg-green-800 hover:text-white hover:opacity-100"
                    onClick={()=> changeLanguage('es')}
                >
                    <img
                        className="w-7 h-5 mr-2"  
                        src={"/imgs/language/spain.jpg"} 
                        alt="" 
                    />
                    Castellano  
                </li>
                <li className="flex items-center p-2 bg-green-500 opacity-50 rounded-b-lg font-semibold hover:bg-green-800 hover:text-white hover:opacity-100"
                    onClick={()=> changeLanguage('en')}
                >
                    <img
                        className="w-7 h-5 mr-2"  
                        src={"/imgs/language/english.jpg"} 
                        alt="" 
                    />
                    English 
                </li>
            </ul>
            }
        </>
    )
}