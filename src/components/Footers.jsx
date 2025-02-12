import { useLanguage } from "../contexts/LanguageContext";

export default function Footer() {

  const { language } = useLanguage(); 

    return (
      <footer className="bg-gray-800 text-white py-6 ">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold ml-5">Baleart</h2>
            <p className="text-sm ml-5">
              {language === "ca" ? "Explora els espais únics de les Illes Balears." 
              : language === "es" ? "Explora los espacios únicos de las Islas Baleares" 
              : "Explore the unique spaces of the Balearic Islands" }   
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <p className="text-sm mr-5">
              &copy; {new Date().getFullYear()} Baleart. ❤️
            </p>
          </div>
        </div>
      </footer>
    );
  }
  