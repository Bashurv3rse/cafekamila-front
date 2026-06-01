import { useEffect, useState } from "react";
import axios from "axios";

function Historial() {

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const cargarHistorial = async () => {

      try {

        const response = await axios.get(
          "http://localhost:8080/pedidos/historial"
        );

        setPedidos(response.data);

      } catch (error) {

        console.error(
          "Error cargando historial:",
          error
        );

      } finally {

        setLoading(false);

      }
    };

    cargarHistorial();

  }, []);

  if (loading) {
    return <p>Cargando historial...</p>;
  }

  return (
    <div>

      <h1>Historial de Pedidos</h1>

      {pedidos.length === 0 ? (

        <p>No existen pedidos en el historial.</p>

      ) : (

        pedidos.map((pedido) => (

          <div
            key={pedido.idPedido}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px"
            }}
          >

            <h3>
              Pedido #{pedido.idPedido}
            </h3>

            <p>
              <strong>Cliente:</strong>{" "}
              {pedido.nombreCliente}
            </p>

            <p>
              <strong>Tipo:</strong>{" "}
              {pedido.tipoPedido}
            </p>

            <p>
              <strong>Estado:</strong>{" "}
              {pedido.estado}
            </p>

            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(
                pedido.fechaHora
              ).toLocaleString()}
            </p>

            <p>
              <strong>Total:</strong>{" "}
              S/{pedido.total}
            </p>

            <h4>Productos</h4>

            <ul>
              {pedido.detalles?.map(
                (detalle) => (

                  <li key={detalle.idDetalle}>

                    {detalle.producto.nombre}
                    {" x "}
                    {detalle.cantidad}

                  </li>

                )
              )}
            </ul>

          </div>

        ))

      )}

    </div>
  );
}

export default Historial;