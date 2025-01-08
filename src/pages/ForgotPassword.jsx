import { useState } from "react";
import { getUserByEmailOnly } from "../services/api";
import { updateUserByEmailOnly } from "../services/api";
import { useAuth } from "../hooks/useAuth";
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
  const { setUser } = useAuth();

  const handleQuetions = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = await getUserByEmailOnly(quetions.email);

      if (
        userData.data.email === quetions.email &&
        userData.data.apellido === quetions.lastName &&
        userData.data.telefono === quetions.phone
      ) {
        setUser(userData);
        setIsVerified(true);
      } else {
        throw new Error("Los datos no coinciden.");
      }
    } catch (error) {
      setError(error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
              try {
                if (password.newPassword !== password.confirmPassword) {
                  throw new Error("Les contrasenyas no coincideixen.");
                }else{
                  await updateUserByEmailOnly(quetions.email, password.newPassword);
                  navigate('/home');
                }
              } catch (err) {
                setError(err.message);
              }
            };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Restablecix la teva Contrasenya</h1>

      {!isVerified ? (
        <form onSubmit={handleQuetions}>
          <input
            type="email"
            placeholder="Email"
            value={quetions.email}
            onChange={(e) =>
              setQuetions({ ...quetions, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Cogmoms"
            value={quetions.lastName}
            onChange={(e) =>
              setQuetions({ ...quetions, lastName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Telèfon"
            value={quetions.phone}
            onChange={(e) =>
              setQuetions({ ...quetions, phone: e.target.value })
            }
          />
          <button type="submit">Validar</button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <p>Datos verificados. Ahora puedes establecer una nueva contraseña.</p>
          <input
            type="password"
            placeholder="Nueva contraseña"
            required
            onChange={(e) =>
              setPassword({ ...password, newPassword: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Confirmar nueva contraseña"
            required
            onChange={(e) =>
              setPassword({ ...password, confirmPassword: e.target.value })
            } 
          />
          <button type="submit">Restableix</button>
        </form>
      )}
    </div>
  );
}
