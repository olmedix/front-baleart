import { useState,useEffect } from "react";
import { useAuth} from "../hooks/useAuth";
import { getUserByEmail,deleteUserByEmail } from "../services/api";
import ModalForm from "../components/ModalForm";
import { fetchGetComments } from "../services/api";


export default function Profile(){

    const [comments,setComments]= useState([]);
    const {user,setUser} = useAuth();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorProfile, setErrorProfile] = useState(null);

    const userEmail = localStorage.getItem("authEmail");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const userFetch = await getUserByEmail(userEmail);
        setUser(userFetch);
      } catch (err) {
        setErrorProfile(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const comments = await fetchGetComments(user.data.id);
        setComments(comments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  },[]);

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta?")) {
      try {
        setIsLoading(true);
        await deleteUserByEmail(userEmail);
        alert("Cuenta eliminada con éxito");
        localStorage.clear();
        window.location.href = "/login"; // Redirige al login
      } catch (err) {
        setErrorProfile(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

    if(loading) return <p>cargando SPACE</p>
    if(error) return <p>Error: {`Error loading spaces: ${error}`}</p>;

    if (isLoading) return <p>Cargando...</p>;
    if (errorProfile) return <p>Error: {`Error loading author: ${errorProfile}`}</p>;

    return(
      <>
      <h2 className="my-6 text-3xl font-semibold">Les meves dades</h2>

      <div>
        <section className="flex justify-between border-b-2 border-stone-500 py-3">

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
        </section>

        <section className="border-b-2 border-stone-500 mx-auto py-3">
          
          <h3 className=" font-semibold text-2xl mb-5">
            Els meus comentaris i valoracions
          </h3>

          <div className="flex mb-7 font-semibold">
            <div className="w-1/2 p-4 bg-green-500">
              Comentaris confirmats
            </div>

            <div className="w-1/2 p-4 bg-red-500">
              Comentaris pendents de confirmació
            </div>
          </div>

          <div className="block text-left">
            <ul>
              {comments.map( (comment,index) =>(
                <li
                  key={index}
                  className={comment.status === 'y' ? "bg-green-600" : "bg-red-500"}
                >
                  <span className="font-semibold">{comment.space}:</span>
                  {comment.comment}
                </li>
              )
              )}
              
            </ul>
          </div>


          
          
        </section>

        <section className="flex items-center h-20 justify-center gap-16">  
          <button 
            className="content-end transition duration-500 hover:bg-black hover:text-red-500 bg-red-500 border-2 font-semibold border-stone-500 py-3 px-14" type="button"
            onClick={handleDelete}
          > 
            <i className="fa-solid fa-trash mr-2"></i>
              Eliminar compte
          </button>
        </section>

      </div>
      </>
    )
}