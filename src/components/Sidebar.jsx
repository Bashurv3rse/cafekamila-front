import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaHistory,
  FaTruck,
  FaDesktop
} from "react-icons/fa";

function Sidebar() {

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  };

  return (
    <div className="sidebar">

      <h2 className="logo">Cafetería</h2>

      <div className="user-info">
        <p>
          <strong>Usuario:</strong>{" "}
          {usuario?.username}
        </p>

        <p>
          <strong>Rol:</strong>{" "}
          {usuario?.rol}
        </p>
      </div>

      <nav>

        <NavLink
          to="/"
          className="nav-link"
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/nueva-orden"
          className="nav-link"
        >
          <FaClipboardList />
          <span>Nueva Orden</span>
        </NavLink>

        <NavLink
          to="/seguimiento"
          className="nav-link"
        >
          <FaTruck />
          <span>Seguimiento</span>
        </NavLink>

        <NavLink
          to="/historial"
          className="nav-link"
        >
          <FaHistory />
          <span>Historial</span>
        </NavLink>

        <NavLink
          to="/incidencias"
          className="nav-link"
        >
          <FaHistory />
          <span>Incidencias</span>
        </NavLink>

        <NavLink
        to="/pantalla-cliente"
        className="nav-link"
        >
        <FaDesktop />
        <span>
            Pantalla Cliente
        </span>
        </NavLink>

      </nav>

      <button
        className="logout-btn"
        onClick={cerrarSesion}
      >
        Cerrar Sesión
      </button>

    </div>
  );
}

export default Sidebar;