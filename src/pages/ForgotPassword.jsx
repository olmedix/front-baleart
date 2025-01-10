import { useState } from "react";
import { getUserByEmailOnly } from "../services/api";
import { updateUserByEmailOnly } from "../services/api";
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quetions, setQuetions] = useState({
    email: "",
    lastName: "",
    phone: "",
  });
  const [password,setPassword] = useState({
    newPassword:"",
    confirmPassword:""
  });
  const [isVerified, setIsVerified] = useState(false);
  const [quetionsWrong, setQuetionsWrong] = useState(false);
  const [passwordWrong, setPasswordWrong] = useState(false);

  const handleQuetions = async (e) => {
    e.preventDefault();
    setQuetionsWrong(false);
    setLoading(true);
    setError(null);

    try {
      const userData = await getUserByEmailOnly(quetions.email);
      
      if (
        userData.email === quetions.email &&
        userData.lastName === quetions.lastName &&
        userData.phone === quetions.phone
      ) { 
        setIsVerified(true);
      } else {
        setQuetionsWrong(true);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setPasswordWrong(false);
              try {
                if (password.newPassword !== password.confirmPassword) {
                  setPasswordWrong(true);
                }else{
                  await updateUserByEmailOnly(quetions.email,{password: password.newPassword});
                  navigate('/home');
                }
              } catch (err) {
                setError(err.message);
              }
            };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="bold text-green-900 mt-8">Restableix la teva Contrasenya</h1>

      {!isVerified ? (
        <form
          className="w-96 m-auto font-medium bg-gray-300 shadow-lg shadow-green-400 rounded-md p-4 my-8" 
          onSubmit={handleQuetions}>
          
          <label className="block font-semibold mb-1 text-lg ">
            Email
          </label>
            <input
              className="ml-2 border-2 border-green-600 rounded-md mb-2 p-1 " 
              type="email"
              placeholder=" Email"
              value={quetions.email}
              onChange={(e) =>
                setQuetions({ ...quetions, email: e.target.value })
              }
            />
         
          <label className="block font-semibold mb-1 text-lg ">
            Cognoms
          </label>
            <input
              className="ml-2 border-2 border-green-600 rounded-md  mb-2 p-1"
              type="text"
              placeholder="Cognoms"
              value={quetions.lastName}
              onChange={(e) =>
                setQuetions({ ...quetions, lastName: e.target.value })
              }
            />
          
          <label className="block font-semibold mb-1 text-lg ">
            Telèfon
          </label>
            <input
              className="ml-2 border-2 border-green-600 rounded-md p-1"
              type="text"
              placeholder="Telèfon"
              value={quetions.phone}
              onChange={(e) =>
                setQuetions({ ...quetions, phone: e.target.value })
              }
            />
          
          <button 
            className="m-auto mt-5 block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-900 transition duration-3000"
            type="submit">
              Validar
          </button>
          {quetionsWrong && (
            <p className="text-red-500">
              Les dades introduïdes no són correctes.
            </p>
          )}
        </form>
      ) : (
        <form 
           className="w-96 m-auto font-medium bg-gray-300 shadow-lg shadow-green-400 rounded-md p-4 my-8"
           onSubmit={handleResetPassword}>
          
          <label className="block font-semibold mb-1 text-lg ">
            Nova contrasenya
            <input
              className="ml-2 border-2 border-green-600 rounded-md mb-2 p-1 "
              type="password"
              placeholder=" ******** "
              required
              onChange={(e) =>
                setPassword({ ...password, newPassword: e.target.value })
              }
            />
          </label>
          <label className="block font-semibold mb-1 text-lg ">
            Confirma la contrasenya
            <input
              className="ml-2 border-2 border-green-600 rounded-md mb-2 p-1 "
              type="password"
              placeholder=" ******** "
              required
              onChange={(e) =>
                setPassword({ ...password, confirmPassword: e.target.value })
              } 
            />
          </label>
          <button 
            className="m-auto mt-5 block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-900 transition duration-3000"
            type="submit">Restableix
          </button>
          {passwordWrong && (
            <p className="text-red-500">
              Les contrasenyes no coincideixen.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
