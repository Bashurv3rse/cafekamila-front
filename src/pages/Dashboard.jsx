import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import "../styles/Dashboard.css";

function Dashboard() {

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarReportes, setMostrarReportes] = useState(false);

  useEffect(() => {

    const cargarDatos = async () => {

      try {

        const response = await axios.get(
          "http://localhost:8080/pedidos"
        );

        setPedidos(response.data);

      } catch (error) {

        console.error(
          "Error cargando dashboard",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    cargarDatos();

  }, []);

  const descargarPedidos = () => {

  window.open(
    "http://localhost:8080/pedidos/exportar",
    "_blank"
  );

};

const descargarHistorial = () => {

  window.open(
    "http://localhost:8080/pedidos/historial/exportar",
    "_blank"
  );

};

  if (loading) {
    return <p>Cargando dashboard...</p>;
  }

  const pendientes =
    pedidos.filter(
      p => p.estado === "PENDIENTE"
    ).length;

  const preparacion =
    pedidos.filter(
      p => p.estado === "PREPARACION"
    ).length;

  const listos =
    pedidos.filter(
      p =>
        p.estado ===
        "LISTO_PARA_ENTREGAR"
    ).length;

  const entregados =
    pedidos.filter(
      p => p.estado === "ENTREGADO"
    ).length;

  const cancelados =
    pedidos.filter(
      p => p.estado === "CANCELADO"
    ).length;

  const ingresos =
    pedidos.reduce(
      (sum, pedido) =>
        sum + pedido.total,
      0
    );

  const estadosData = [

    {
      name: "Pendiente",
      value: pendientes
    },

    {
      name: "Preparación",
      value: preparacion
    },

    {
      name: "Listo",
      value: listos
    },

    {
      name: "Entregado",
      value: entregados
    },

    { name: "Cancelado", 
      value: cancelados }

  ];
  const COLORS = [
  "#f39c12", // Pendiente
  "#3498db", // Preparación
  "#50f3eb", // Listo
  "#27ae60", // Entregado
  "#e74c3c"  // Cancelado
    ];
  const ultimosPedidos =
    [...pedidos]
      .sort(
        (a, b) =>
          new Date(b.fechaHora) -
          new Date(a.fechaHora)
      )
      .slice(0, 5);

  return (

    <div className="dashboard">

      <h1>Dashboard</h1>

      <div className="quick-actions">

        <Link
          to="/nueva-orden"
          className="quick-btn"
        >
          Nuevo Pedido
        </Link>

        <Link
          to="/seguimiento"
          className="quick-btn"
        >
          Seguimiento
        </Link>

        <Link
          to="/historial"
          className="quick-btn"
        >
          Historial
        </Link>

        <Link
          to="/incidencias"
          className="quick-btn"
        >
          Incidencias
        </Link>

        <div className="reportes-dropdown">

          <button
            className="quick-btn"
            onClick={() =>
              setMostrarReportes(
                !mostrarReportes
              )
            }
          >
            📊 Reportes ▼
          </button>

          {mostrarReportes && (

            <div className="dropdown-menu">

              <button
                onClick={descargarPedidos}
              >
                Descargar Pedidos
              </button>

              <button
                onClick={descargarHistorial}
              >
                Descargar Historial
              </button>

            </div>

          )}

        </div>

      </div>

      <div className="cards">

        <div className="card">
          <h3>Pendientes</h3>
          <span>{pendientes}</span>
        </div>

        <div className="card">
          <h3>Preparación</h3>
          <span>{preparacion}</span>
        </div>

        <div className="card">
          <h3>Listos</h3>
          <span>{listos}</span>
        </div>

        <div className="card">
          <h3>Entregados</h3>
          <span>{entregados}</span>
        </div>

      </div>

      <div className="dashboard-middle">

        <div className="panel">

          <h2>
            Distribución de Pedidos
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

                <Pie
                data={estadosData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
                >
                {estadosData.map((entry, index) => (
                    <Cell
                    key={`cell-${index}`}
                    fill={
                        COLORS[index % COLORS.length]
                    }
                    />
                ))}
                </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="panel">

          <h2>
            Ingresos Totales
          </h2>

          <div className="grafico-falso">

            <div className="circulo">

              <span>
                S/
                {ingresos.toFixed(2)}
              </span>

            </div>

          </div>

        </div>

      </div>

      <div className="panel">

        <h2>
          Últimos Pedidos
        </h2>

        <table>

          <thead>

            <tr>

              <th>Pedido</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th>Total</th>

            </tr>

          </thead>

          <tbody>

            {ultimosPedidos.map(
              pedido => (

                <tr
                  key={
                    pedido.idPedido
                  }
                >

                  <td>
                    #
                    {
                      pedido.idPedido
                    }
                  </td>

                  <td>
                    {
                      pedido.nombreCliente
                    }
                  </td>

                  <td>
                    {
                      pedido.estado
                    }
                  </td>

                  <td>
                    S/
                    {
                      pedido.total
                    }
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Dashboard;