import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaClipboardList,
  FaHistory,
  FaTruck
} from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Cafetería</h2>

      <nav>

        <NavLink to="/" className="nav-link">
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

      </nav>
    </div>
  );
}

export default Sidebar;