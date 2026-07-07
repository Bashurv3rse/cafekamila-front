const API_URL = "http://localhost:8080";

export const getProductos = async () => {
  const res = await fetch(`${API_URL}/productos`);
  return res.json();
};
export const createProducto = async (
  producto
) => {

  const res = await fetch(
    `${API_URL}/productos`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(
        producto
      ),
    }
  );

  if (!res.ok) {
    throw new Error(
      "Error al crear producto"
    );
  }

  return res.json();

};
export const updateProducto = async (
  id,
  producto
) => {

  const res = await fetch(
    `${API_URL}/productos/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(
        producto
      ),
    }
  );

  if (!res.ok) {
    throw new Error(
      "Error al actualizar producto"
    );
  }

  return res.json();

};
export const deleteProducto = async (
  id
) => {

  const res = await fetch(
    `${API_URL}/productos/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Error al eliminar producto"
    );
  }

};
export const createPedido = async (pedido) => {
  const res = await fetch(`${API_URL}/pedidos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pedido),
  });

  if (!res.ok) {
    throw new Error("Error al registrar pedido");
  }

  return res.json();
};

export const getPedidosPorEstado = async (estado) => {
  const res = await fetch(
    `${API_URL}/pedidos/estado/${estado}`
  );

  return res.json();
};

export const cambiarEstadoPedido = async (
  id,
  estado
) => {
  const res = await fetch(
    `${API_URL}/pedidos/${id}/estado`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        estado,
      }),
    }
  );

  return res.json();
};

export const getHistorial = async () => {
  const res = await fetch(
    `${API_URL}/pedidos/historial`
  );

  return res.json();
};