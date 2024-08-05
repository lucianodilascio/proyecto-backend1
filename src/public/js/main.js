// Instancia de socket.io desde el front
const socket = io();

// Escuchamos el evento "productos" y recibimos el array de datos
socket.on("productos", (data) => {
  renderProductos(data);
});

const renderProductos = (productos) => {
  const contenedorProductos = document.getElementById("contenedorProductos");
  if (!contenedorProductos) {
    console.error("Contenedor de productos no encontrado.");
    return;
  }

  contenedorProductos.innerHTML = "";
  productos.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <p>ID: ${item.id}</p>
      <p>Title: ${item.title}</p>
      <p>Price: ${item.price}</p>
      <button onclick="eliminarProducto('${item.id}')">Eliminar</button>
    `;
    contenedorProductos.appendChild(card);
  });
};

// Función para eliminar producto
const eliminarProducto = (id) => {
  socket.emit("eliminarProducto", id);
}
