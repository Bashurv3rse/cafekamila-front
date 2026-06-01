import { useEffect, useState } from "react";
import {
  getProductos,
  createPedido
} from "../api/api";
import "../styles/NuevaOrden.css";

function NuevaOrden() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [tipoPrecio, setTipoPrecio] = useState("Menor");
  const [nombreCliente, setNombreCliente] = useState("");

  useEffect(() => {
    getProductos().then((data) => {
      setProductos(data);
    });
  }, []);

  const obtenerPrecio = (producto) => {
    return tipoPrecio === "Mayor"
      ? producto.precioMayor
      : producto.precioMenor;
  };

  const agregarProducto = (producto) => {
    const existe = carrito.find(
      (item) => item.idProducto === producto.idProducto
    );

    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.idProducto === producto.idProducto
            ? {
                ...item,
                cantidad: item.cantidad + 1,
              }
            : item
        )
      );
    } else {
      setCarrito([
        ...carrito,
        {
          ...producto,
          cantidad: 1,
        },
      ]);
    }
  };

  const aumentarCantidad = (idProducto) => {
    setCarrito(
      carrito.map((item) =>
        item.idProducto === idProducto
          ? {
              ...item,
              cantidad: item.cantidad + 1,
            }
          : item
      )
    );
  };

  const disminuirCantidad = (idProducto) => {
    setCarrito(
      carrito
        .map((item) =>
          item.idProducto === idProducto
            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const total = carrito.reduce((acum, item) => {
    return acum + obtenerPrecio(item) * item.cantidad;
  }, 0);

    const registrarPedido = async () => {

    if (!nombreCliente.trim()) {
        alert("Ingrese el nombre del cliente");
        return;
    }

    if (carrito.length === 0) {
        alert("Agregue al menos un producto");
        return;
    }

    const pedido = {
        nombreCliente,
        tipoPedido: tipoPrecio,
        detalles: carrito.map((item) => ({
        idProducto: item.idProducto,
        cantidad: item.cantidad,
        })),
    };

    try {

        const respuesta = await createPedido(pedido);

        alert(
        `Pedido #${respuesta.idPedido} registrado correctamente`
        );

        // Limpiar formulario
        setCarrito([]);
        setNombreCliente("");
        setTipoPrecio("Menor");

        // Recargar productos para reflejar stock actualizado
        const productosActualizados =
        await getProductos();

        setProductos(productosActualizados);

    } catch (error) {

        console.error(error);

        alert(
        "Error al registrar el pedido"
        );
    }
    };
  return (
    <div>
      <h1>Nueva Orden</h1>

      <div className="pos-container">

        {/* PRODUCTOS */}

        <section className="productos-panel">
          <div className="productos-grid">
            {productos.map((prod) => (
              <div
                className="producto-card"
                key={prod.idProducto}
              >
                <h3>{prod.nombre}</h3>

                <p>{prod.categoria}</p>

                <p>
                  <strong>Mayor:</strong> S/{prod.precioMayor}
                </p>

                <p>
                  <strong>Menor:</strong> S/{prod.precioMenor}
                </p>

                <p>Stock: {prod.stock}</p>

                <button
                  onClick={() => agregarProducto(prod)}
                >
                  Agregar
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CARRITO */}

        <section className="carrito-panel">
          <h2>Nueva Orden</h2>

          <div className="form-group">
            <label>Cliente</label>

            <input
              type="text"
              placeholder="Nombre del cliente"
              value={nombreCliente}
              onChange={(e) =>
                setNombreCliente(e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Tipo de Precio</label>

            <select
              value={tipoPrecio}
              onChange={(e) =>
                setTipoPrecio(e.target.value)
              }
            >
              <option value="Menor">
                Precio Menor
              </option>

              <option value="Mayor">
                Precio Mayor
              </option>
            </select>
          </div>

          <hr />

          <h3>Carrito</h3>

          {carrito.length === 0 ? (
            <div className="carrito-vacio">
              No hay productos agregados
            </div>
          ) : (
            carrito.map((item) => (
              <div
                key={item.idProducto}
                className="carrito-item"
              >
                <div>
                  <strong>{item.nombre}</strong>

                  <p>
                    S/{obtenerPrecio(item)} x{" "}
                    {item.cantidad}
                  </p>

                  <p>
                    Subtotal: S/
                    {(
                      obtenerPrecio(item) *
                      item.cantidad
                    ).toFixed(2)}
                  </p>
                </div>

                <div className="cantidad-controls">
                  <button
                    onClick={() =>
                      disminuirCantidad(
                        item.idProducto
                      )
                    }
                  >
                    -
                  </button>

                  <span>{item.cantidad}</span>

                  <button
                    onClick={() =>
                      aumentarCantidad(
                        item.idProducto
                      )
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}

          <hr />

          <div className="total-section">
            <h3>Total</h3>
            <h2>S/ {total.toFixed(2)}</h2>
          </div>

          <button
            className="btn-registrar"
            onClick={registrarPedido}
            >
            Registrar Pedido
            </button>
        </section>

      </div>
    </div>
  );
}

export default NuevaOrden;