import { useState,useEffect } from "react";
import { useAuth} from "../hooks/useAuth";
import { getUserByEmail,deleteUserByEmail } from "../services/api";
import ModalForm from "../components/ModalForm";


export default function Profile(){

    const {user,setUser} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const userEmail = localStorage.getItem("authEmail");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userFetch = await getUserByEmail(userEmail);
        setUser(userFetch);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta?")) {
      try {
        setIsLoading(true);
        await deleteUserByEmail(userEmail);
        alert("Cuenta eliminada con éxito");
        localStorage.clear();
        window.location.href = "/login"; // Redirige al login
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

    if (isLoading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return(
      <>
      <h2 className="my-6 text-3xl font-semibold">Les meves dades</h2>

      <div>
      <div className="flex justify-between border-b-2 border-stone-500 py-3">

        <div className="w-3/5 text-left">
          <h3 className="ml-5 font-semibold text-2xl mb-5">Dades personals</h3>

          <h4 className="font-semibold ml-5">Nom</h4>
          <p className="ml-5 mb-5">{user.data?.nombre || 'Nom no disponible'}</p>

          <h4 className="font-semibold ml-5">Cognoms</h4>
          <p className="ml-5 mb-5">{user.data?.apellido ||'Cognoms no disponible'}</p>

          <h4 className="font-semibold ml-5">Email</h4>
          <p className="ml-5 mb-5">{user.data?.email || 'Email no disponible'}</p>

          <h4 className="font-semibold ml-5">Telèfon</h4>
          <p className="ml-5 mb-5">{user.data?.telefono || 'Telèfon no disponible'}</p>

          <h4 className="font-semibold ml-5">Contrasenya</h4>
          <p className="ml-5">**********</p>

        </div>
        
        <div className="flex items-center">
          <ModalForm  setUser={setUser} userEmail={userEmail}/>
        </div>
      </div>

        <div className="flex items-center h-20 justify-center gap-16">  
          <button 
            className="content-end transition duration-500 hover:bg-black hover:text-red-500 bg-red-500 border-2 font-semibold border-stone-500 py-3 px-14" type="button"
            onClick={handleDelete}
          > 
            <i className="fa-solid fa-trash mr-2"></i>
              Eliminar compte
          </button>
        </div>

      </div>
      </>
    )
}