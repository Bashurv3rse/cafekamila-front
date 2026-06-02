import { useEffect, useState } from "react";

import {
  getPedidosPorEstado,
  cambiarEstadoPedido,
} from "../api/api";
import "../styles/Incidencias.css";

function Incidencias() {

  const [pedidos, setPedidos] =
    useState([]);

  const [formularios, setFormularios] =
    useState({});

  const cargarPedidos = async () => {

    try {

      const pendientes =
        await getPedidosPorEstado(
          "PENDIENTE"
        );

      const preparacion =
        await getPedidosPorEstado(
          "PREPARACION"
        );

      const listos =
        await getPedidosPorEstado(
          "LISTO_PARA_ENTREGAR"
        );

      setPedidos([
        ...pendientes,
        ...preparacion,
        ...listos,
      ]);

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

  const actualizarFormulario = (
    idPedido,
    campo,
    valor
  ) => {

    setFormularios((prev) => ({
      ...prev,
      [idPedido]: {
        ...prev[idPedido],
        [campo]: valor,
      },
    }));

  };

  const cancelarPedido = async (
    idPedido
    ) => {

    const motivo =
        formularios[idPedido]?.motivo;

    if (!motivo) {
        alert(
        "Seleccione un motivo."
        );
        return;
    }

    try {

      await cambiarEstadoPedido(
        idPedido,
        "CANCELADO"
      );

      await cargarPedidos();

      alert(
        "Pedido cancelado correctamente"
      );

    } catch (error) {

      console.error(
        "Error cancelando pedido",
        error
      );

      alert(
        "No se pudo cancelar el pedido"
      );

    }
  };

  return (

    <div className="incidencias-container">

      <h1>
        Registro de Incidencias
      </h1>

      {pedidos.length === 0 && (

        <p>
          No hay pedidos disponibles.
        </p>

      )}

      {pedidos.map((pedido) => (

        <div
            key={pedido.idPedido}
            className="incidencia-card"
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
            Estado:
            {" "}
            {pedido.estado}
          </p>

          <p>
            Total:
            {" "}
            S/
            {pedido.total}
          </p>

          <hr />

          <label>
            Motivo:
          </label>

          <br />

          <select
            className="incidencia-select"
            value={
              formularios[
                pedido.idPedido
              ]?.motivo || ""
            }
            onChange={(e) =>
              actualizarFormulario(
                pedido.idPedido,
                "motivo",
                e.target.value
              )
            }
          >
            <option value="">
              Seleccione un motivo
            </option>

            <option value="FALTA_INSUMOS">
              Falta de insumos
            </option>

            <option value="ERROR_PEDIDO">
              Error en pedido
            </option>

            <option value="CLIENTE_CANCELA">
              Cliente cancela
            </option>

            <option value="OTRO">
              Otro
            </option>
          </select>

          <br />
          <br />

          <label>
            Descripción:
          </label>

          <br />

          <textarea
            rows="4"
            className="incidencia-textarea"
            value={
              formularios[
                pedido.idPedido
              ]?.descripcion || ""
            }
            onChange={(e) =>
              actualizarFormulario(
                pedido.idPedido,
                "descripcion",
                e.target.value
              )
            }
          />

          <br />
          <br />

          <button
            className="btn-cancelar"
            onClick={() =>
              cancelarPedido(
                pedido.idPedido
              )
            }
          >
            Cancelar Pedido
          </button>

        </div>

      ))}

    </div>

  );
}

export default Incidencias;