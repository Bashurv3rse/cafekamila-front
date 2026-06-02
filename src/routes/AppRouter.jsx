import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import NuevaOrden from "../pages/NuevaOrden";
import Seguimiento from "../pages/Seguimiento";
import Historial from "../pages/Historial";
import Incidencias from "../pages/Incidencias";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
        path="/login"
        element={<Login />}
        />

        <Route
          path="/"
          element={
           <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute> 
          }
        />

        <Route
          path="/nueva-orden"
          element={
          <ProtectedRoute>
            <MainLayout>
              <NuevaOrden />
            </MainLayout>
          </ProtectedRoute> 
          }
        />

        <Route
          path="/seguimiento"
          element={
          <ProtectedRoute>
            <MainLayout>
              <Seguimiento />
            </MainLayout>
          </ProtectedRoute> 
          }
        />

        <Route
          path="/historial"
          element={
          <ProtectedRoute>
            <MainLayout>
              <Historial />
            </MainLayout>
          </ProtectedRoute> 
          }
        />

          <Route
          path="/incidencias"
          element={
          <ProtectedRoute>
            <MainLayout>
              <Incidencias />
            </MainLayout>
          </ProtectedRoute> 
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;