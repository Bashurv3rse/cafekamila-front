import { useEffect, useState } from "react";

import {
  getPedidosPorEstado,
  cambiarEstadoPedido,
} from "../api/api";

function Seguimiento() {

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

    const init = async () => {
        await cargarPedidos();
    };

    init();

    }, []);

  const avanzarEstado = async (
    idPedido,
    nuevoEstado
  ) => {

    try {

      await cambiarEstadoPedido(
        idPedido,
        nuevoEstado
      );

      cargarPedidos();

    } catch (error) {

      console.error(
        "Error actualizando estado",
        error
      );

    }
  };

  const renderPedidos = (
    pedidos,
    botonTexto,
    siguienteEstado
  ) => {

    return pedidos.map((pedido) => (

      <div
        key={pedido.idPedido}
        className="pedido-card"
      >

        <h3>
          Pedido #{pedido.idPedido}
        </h3>

        <p>
          Cliente:
          {" "}
          {pedido.nombreCliente}
        </p>

        <p>
          Total:
          {" "}
          S/
          {pedido.total}
        </p>

        <hr />

        {pedido.detalles.map(
          (detalle) => (

            <div
              key={
                detalle.idDetalle
              }
            >
              <div>
                {detalle.producto.nombre}
                {" "}
                x
                {" "}
                {detalle.cantidad}
                </div>
            </div>

          )
        )}

        <button
          onClick={() =>
            avanzarEstado(
              pedido.idPedido,
              siguienteEstado
            )
          }
        >
          {botonTexto}
        </button>

      </div>

    ));
  };

  return (

    <div>

      <h1>
        Seguimiento de Pedidos
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr 1fr",
          gap: "20px",
        }}
      >

        <div>

          <h2>Pendientes</h2>

          {renderPedidos(
            pendientes,
            "Iniciar Preparación",
            "PREPARACION"
          )}

        </div>

        <div>

          <h2>Preparación</h2>

          {renderPedidos(
            preparacion,
            "Listo para Entregar",
            "LISTO_PARA_ENTREGAR"
          )}

        </div>

        <div>

          <h2>
            Listo para Entregar
          </h2>

          {renderPedidos(
            listos,
            "Entregar",
            "ENTREGADO"
          )}

        </div>

      </div>

    </div>

  );
}

export default Seguimiento;