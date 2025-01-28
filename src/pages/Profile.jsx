import { useState,useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { getUser,deleteUserByEmail} from "../services/api";
import ModalForm from "../components/ModalForm";



export default function Profile(){

    const { language } = useLanguage();
    const [user,setUser] = useState({});
    const [userLoading,setUserLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorProfile, setErrorProfile] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          setUserLoading(true);
          const usuario = await getUser();
          console.log(usuario);
          setUser(usuario);
        } catch (err) {
          setErrorProfile(err.message);
        } finally {
          setUserLoading(false);
        }
      };
      fetchUser();
    }, [refresh]);

    const handleRefresh = () => {
      setRefresh((prev) => !prev); 
  };


  const handleDelete = async () => {
    if (window.confirm("¿Estàs segur de que desitges eliminar el teu compte?")) {
      try {
        setIsLoading(true);
        await deleteUserByEmail(user?.data?.email);
        alert("Compte eliminagt amb èxit");
        localStorage.clear();
        window.location.href = "/login";
      } catch (err) {
        setErrorProfile(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

   if (userLoading || isLoading) return <p>Cargando...</p>;
    if (errorProfile) return <p>{errorProfile}</p>;

    return (
      <>
        <h2 className="my-6 text-3xl font-semibold">
          {language === "ca" ? "Les meves dades" : language === "es" ? "Mis datos" : "My data"}
        </h2>
    
    <div>
          <section className="flex justify-between border-b-2 border-stone-500 py-3">
            <div className="w-3/5 text-left">
              <h3 className="ml-5 font-semibold text-2xl mb-5">
                {language === "ca" ? "Dades personals" : language === "es" ? "Datos personales" : "Personal data"}
              </h3>
    
              <h4 className="font-semibold ml-5">
                {language === "ca" ? "Nom" : language === "es" ? "Nombre" : "Name"}
              </h4>
              <p className="ml-5 mb-5">{user.data?.nombre}</p>
    
              <h4 className="font-semibold ml-5">
                {language === "ca" ? "Cognoms" : language === "es" ? "Apellidos" : "Last name"}
              </h4>
              <p className="ml-5 mb-5">{user.data?.apellido}</p>
    
              <h4 className="font-semibold ml-5">
                {language === "ca" ? "Email" : language === "es" ? "Correo electrónico" : "Email"}
              </h4>
              <p className="ml-5 mb-5">{user.data?.email}</p>
    
              <h4 className="font-semibold ml-5">
                {language === "ca" ? "Telèfon" : language === "es" ? "Teléfono" : "Phone"}
              </h4>
              <p className="ml-5 mb-5">{user.data?.telefono}</p>
    
              <h4 className="font-semibold ml-5">
                {language === "ca" ? "Contrasenya" : language === "es" ? "Contraseña" : "Password"}
              </h4>
              <p className="ml-5">**********</p>
            </div>
    
            <div className="flex items-center">
              <ModalForm userEmail={user?.data?.email} onUpdate={handleRefresh}/>
            </div>
          </section>

          
            <section className="border-b-2 border-stone-500 mx-auto py-3">
              <h3 className="font-semibold text-2xl mb-5">
                {language === "ca" ? "Els meus comentaris i valoracions" : language === "es" ? "Mis comentarios y valoraciones" : "My comments and ratings"}
              </h3>
    
              <div className="flex items-center justify-center mb-7 font-semibold">
                <div className="w-1/3 p-4 mr-14 border border-green-800 rounded-lg bg-green-500">
                  {language === "ca" ? "Comentaris confirmats" : language === "es" ? "Comentarios confirmados" : "Confirmed comments"}
                </div>
            
                <div className="w-1/3 p-4 border border-red-800 rounded-lg bg-red-500">
                  {language === "ca" ? "Comentaris no confirmats" : language === "es" ? "Comentarios no confirmados" : "Unconfirmed comments"}
                </div>
              </div>
              {user?.data?.comments.length > 0 ? (
              <div className="block text-left">
                  <ul className="rounded-lg">
                    {user.data.comments.map((comment, index) => (
                      <li
                        key={index}
                        className={`mb-3 ${comment.estado === 'y' ? 'text-green-600' : 'text-red-500'}`}
                      >
                        <span className="text-yellow-500 font-semibold pr-5">
                          {comment.puntuacion}
                          <i className="fa-solid fa-star text-xl text-yellow-500"></i>
                        </span>
                        {comment.comentario}
                      </li>
                    ))}
                  </ul>   
              </div>
            ) 
            :
            <p>{language === "ca" ? "Encara no has realitzat cap comentari" : 
                language === "es" ? "Aún no has realizado ningún comentario" : 
                                    "You have not made any comments yet"}</p>
          }
            </section>
          
          
          <section className="flex items-center h-20 justify-center gap-16">
            <button
              className="content-end transition duration-500 hover:bg-black hover:text-red-500 bg-red-500 border-2 font-semibold border-stone-500 py-3 px-14"
              type="button"
              onClick={handleDelete}
            >
              <i className="fa-solid fa-trash mr-2"></i>
              {language === "ca" ? "Eliminar compte" : language === "es" ? "Eliminar cuenta" : "Delete account"}
            </button>
          </section>
        </div>
        
      </>
    );
}    