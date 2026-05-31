import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import NuevaOrden from "../pages/NuevaOrden";
import Historial from "../pages/Historial";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/nueva-orden" element={<NuevaOrden />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;