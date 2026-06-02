import { useEffect, useState } from "react";

import {
  getPedidosPorEstado,
} from "../api/api";

import "../styles/PantallaCliente.css";

function PantallaCliente() {

  const [pendientes, setPendientes] =
    useState([]);

  const [preparacion, setPreparacion] =
    useState([]);

  const [listos, setListos] =
    useState([]);

  const cargarPedidos = async () => {

    try {

      const pendientesData =
        await getPedidosPorEstado(
          "PENDIENTE"
        );

      const preparacionData =
        await getPedidosPorEstado(
          "PREPARACION"
        );

      const listosData =
        await getPedidosPorEstado(
          "LISTO_PARA_ENTREGAR"
        );

      setPendientes(
        pendientesData
      );

      setPreparacion(
        preparacionData
      );

      setListos(
        listosData
      );

    } catch (error) {

      console.error(
        "Error cargando pedidos",
        error
      );

    }

  };

  useEffect(() => {

    cargarPedidos();

    const intervalo =
      setInterval(
        cargarPedidos,
        5000
      );

    return () =>
      clearInterval(intervalo);

  }, []);

  const renderPedidos = (
    pedidos,
    tipo
  ) => {

    return pedidos.map(
      (pedido) => (

        <div
          key={pedido.idPedido}
          className={`cliente-card ${tipo}`}
        >

          <h2>
            ORD-
            {String(
              pedido.idPedido
            ).padStart(4, "0")}
          </h2>

          <p>
            <strong>
              Cliente:
            </strong>
            {" "}
            {pedido.nombreCliente}
          </p>

          <div className="productos">

            {pedido.detalles.map(
              (detalle) => (

                <div
                  key={
                    detalle.idDetalle
                  }
                >
                  •
                  {" "}
                  {
                    detalle.producto
                      .nombre
                  }
                  {" "}
                  x
                  {" "}
                  {
                    detalle.cantidad
                  }
                </div>

              )
            )}

          </div>

          {
            tipo ===
              "preparacion" && (

              <div
                className="tiempo"
              >
                ⏱ 15 min
              </div>

            )
          }

          {
            tipo ===
              "listo" && (

              <div
                className="mensaje-listo"
              >
                ✓ Recoger en
                mostrador
              </div>

            )
          }

        </div>

      )
    );

  };

  return (

    <div
      className="pantalla-cliente"
    >

      <h1>
        Estado de Pedidos
      </h1>

      <p
        className="actualizacion"
      >
        Esta pantalla se
        actualiza cada 5
        segundos
      </p>

      <div
        className="estado-grid"
      >

        <div>

          <h2>
            En Espera
          </h2>

          {
            renderPedidos(
              pendientes,
              "pendiente"
            )
          }

        </div>

        <div>

          <h2>
            En Preparación
          </h2>

          {
            renderPedidos(
              preparacion,
              "preparacion"
            )
          }

        </div>

        <div>

          <h2>
            Listos
          </h2>

          {
            renderPedidos(
              listos,
              "listo"
            )
          }

        </div>

      </div>

    </div>

  );

}

export default PantallaCliente;