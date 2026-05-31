const API_URL = "http://localhost:8080";

export const getProductos = async () => {
  const res = await fetch(`${API_URL}/productos`);
  return res.json();
};

export const crearPedido = async (pedido) => {
  const res = await fetch(`${API_URL}/pedidos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pedido),
  });
  return res.json();
};

export const getPedidosPorEstado = async (estado) => {
  const res = await fetch(`${API_URL}/pedidos/estado/${estado}`);
  return res.json();
};

export const cambiarEstadoPedido = async (id, estado) => {
  const res = await fetch(`${API_URL}/pedidos/${id}/estado`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ estado }),
  });
  return res.json();
};

export const getHistorial = async () => {
  const res = await fetch(`${API_URL}/pedidos/historial`);
  return res.json();
};