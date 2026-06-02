import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem(
        "usuario",
        JSON.stringify(response.data)
      );

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <h1>☕ Kamila</h1>
          <p>Sistema Interno de Personal</p>
        </div>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >
          <label>Usuario</label>

          <input
            type="text"
            placeholder="Ingrese su usuario"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <label>Contraseña</label>

          <input
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="login-btn"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;