const API_URL = import.meta.env.VITE_API_URL;

export const getProductos = async () => {
  const res = await fetch(`${API_URL}/productos`);
  return res.json();
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