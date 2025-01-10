import { useState } from "react";
import { updateUserByEmailOnly } from "../services/api"; // Este método usará fetch
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quetions, setQuetions] = useState({
    email: "",
    lastName: "",
    phone: "",
  });
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [isVerified, setIsVerified] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (password.newPassword !== password.confirmPassword) {
        throw new Error("Les contrasenyas no coincideixen.");
      }
      // Enviar la solicitud PUT
        await updateUserByEmailOnly(quetions.email, { password: password.newPassword });
        navigate("/home");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Restableix la teva Contrasenya</h1>

      {!isVerified ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsVerified(true); // Simula la verificación en esta lógica
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={quetions.email}
            onChange={(e) => setQuetions({ ...quetions, email: e.target.value })}
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
