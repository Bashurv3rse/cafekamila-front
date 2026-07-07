import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  rolesPermitidos = []
}) {

  const usuarioGuardado =
    localStorage.getItem("usuario");

  if (!usuarioGuardado) {
    return <Navigate to="/login" />;
  }

  const usuario = JSON.parse(usuarioGuardado);

  if (
    rolesPermitidos.length > 0 &&
    !rolesPermitidos.includes(usuario.rol)
  ) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;