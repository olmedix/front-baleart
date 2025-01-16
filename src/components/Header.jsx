import Navigation from "./Navigation"

export default function Header(){
    return(
        <>
        <header className="flex ">
            <h1 className="font-bold mr-6 cursor-pointer hover:scale-110">
                Baleart
                <i className="fa-solid fa-language text-2xl pl-3"></i>
            </h1>

            

            <Navigation/>
        </header>

        <ul className="pt-2 ml-44 absolute z-10">
                <li className="flex items-center p-2 bg-green-500 opacity-50 rounded-t-lg">
                    <img
                        className="w-7 h-5 mr-2 "  
                        src={"/imgs/language/catalan.jpg"} 
                        alt="" />Català 
                </li>
                <li className="flex items-center p-2 bg-green-500 opacity-50">
                    <img
                        className="w-7 h-5 mr-2"  
                        src={"/imgs/language/spain.jpg"} 
                        alt="" />Castellano  
                </li>
                <li className="flex items-center p-2 bg-green-500 opacity-50 rounded-b-lg">
                    <img
                        className="w-7 h-5 mr-2"  
                        src={"/imgs/language/english.jpg"} 
                        alt="" />English 
                </li>
            </ul>

        </>
    )
}