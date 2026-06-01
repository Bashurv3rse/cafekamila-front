import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import NuevaOrden from "../pages/NuevaOrden";
import Seguimiento from "../pages/Seguimiento";
import Historial from "../pages/Historial";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        <Route
          path="/nueva-orden"
          element={
            <MainLayout>
              <NuevaOrden />
            </MainLayout>
          }
        />

        <Route
          path="/seguimiento"
          element={
            <MainLayout>
              <Seguimiento />
            </MainLayout>
          }
        />

        <Route
          path="/historial"
          element={
            <MainLayout>
              <Historial />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;