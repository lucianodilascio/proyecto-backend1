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
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">ID: ${item.id}</p>
        <p class="card-text">Description: ${item.description}</p>
        <p class="card-text">Price: $${item.price}</p>
        <p class="card-text">Code: ${item.code}</p>
        <p class="card-text">Stock: ${item.stock}</p>
        <p class="card-text">Category: ${item.category}</p>
        <p class="card-text">Status: ${item.status}</p>
        <button class="btn btn-danger" onclick="eliminarProducto('${item.id}')">Eliminar</button>
      </div>
    `;
    contenedorProductos.appendChild(card);
  });
};

// Función para eliminar producto
const eliminarProducto = (id) => {
  socket.emit("eliminarProducto", id);
}

