import { useEffect, useState } from "react";
import {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto
} from "../api/api";

import "../styles/AdminProductos.css";

function AdminProductos() {

  const [productos, setProductos] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    precioMayor: "",
    precioMenor: "",
    stock: ""
  });

  // Cargar productos
  const cargarProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };
  const [editando, setEditando] = useState(null);
  const handleEditar = (producto) => {

  setForm({
    nombre: producto.nombre,
    categoria: producto.categoria,
    precioMayor: producto.precioMayor,
    precioMenor: producto.precioMenor,
    stock: producto.stock
  });

  setEditando(producto.idProducto);

};

useEffect(() => {

  const cargar = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  cargar();

}, []);

  // Manejar inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Crear producto
const handleSubmit = async (e) => {

  e.preventDefault();

  const productoData = {

    ...form,

    precioMayor: Number(
      form.precioMayor
    ),

    precioMenor: Number(
      form.precioMenor
    ),

    stock: Number(
      form.stock
    )

  };

  try {

    if (editando) {

      await updateProducto(
        editando,
        productoData
      );

      alert(
        "Producto actualizado"
      );

    } else {

      await createProducto(
        productoData
      );

      alert(
        "Producto agregado"
      );

    }

    setForm({
      nombre: "",
      categoria: "",
      precioMayor: "",
      precioMenor: "",
      stock: ""
    });

    setEditando(null);

    cargarProductos();

  } catch (error) {

    console.error(error);

    alert(
      "Error al guardar producto"
    );

  }

};

  // Eliminar producto
  const handleDelete = async (id) => {

    const confirmar = window.confirm(
      "¿Eliminar producto?"
    );

    if (!confirmar) return;

    try {
      await deleteProducto(id);
      cargarProductos();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };

  return (
    <div className="admin-productos">

      <h1>Administración de Productos</h1>

      {/* FORMULARIO */}

      <form
        className="form-producto"
        onSubmit={handleSubmit}
      >

        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <input
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
        />

        <input
          name="precioMayor"
          placeholder="Precio Mayor"
          type="number"
          value={form.precioMayor}
          onChange={handleChange}
        />

        <input
          name="precioMenor"
          placeholder="Precio Menor"
          type="number"
          value={form.precioMenor}
          onChange={handleChange}
        />

        <input
          name="stock"
          placeholder="Stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
        />

        <button type="submit">
          {editando
            ? "Actualizar Producto"
            : "Agregar Producto"}
        </button>

      </form>

      {/* TABLA */}

      <table className="tabla-productos">

        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Mayor</th>
            <th>Menor</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>

          {productos.map((p) => (
            <tr key={p.idProducto}>

              <td>{p.idProducto}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>S/ {p.precioMayor}</td>
              <td>S/ {p.precioMenor}</td>
              <td>{p.stock}</td>

              <td>

                <button
                  className="btn-editar"
                  onClick={() =>
                    handleEditar(p)
                  }
                >
                  Editar
                </button>

                <button
                  className="btn-eliminar"
                  onClick={() =>
                    handleDelete(
                      p.idProducto
                    )
                  }
                >
                  Eliminar
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminProductos;