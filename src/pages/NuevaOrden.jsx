import { useEffect, useState } from "react";
import { getProductos } from "../api/api";
import "../styles/NuevaOrden.css";

function NuevaOrden() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos().then(data => {
      setProductos(data);
    });
  }, []);

  return (
    <div>
      <h1>Nueva Orden</h1>

      <div className="productos-grid">
        {productos.map(prod => (
          <div className="producto-card" key={prod.id_producto}>
            <h3>{prod.nombre}</h3>

            <p>{prod.categoria}</p>

            <p>
              <strong>S/{prod.precioMayor}</strong>
            </p>
            <p>
              <strong>S/{prod.precioMenor}</strong>
            </p>

            <p>Stock: {prod.stock}</p>

            <button>
              Agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NuevaOrden;