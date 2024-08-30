
const socket = io();


socket.on("productos", (data) => {
  renderProductos(data);
});

const renderProductos = (productos) => {
  const contenedorProductos = document.getElementById("contenedorProductos");
  console.log(contenedorProductos);
  if (!contenedorProductos) {
    console.error("Contenedor de productos no encontrado.");
    return;
  }
  contenedorProductos.innerHTML = "";
  
productos.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      
        <p class="card-title">${item.title}<p>
        <p class="card-text">ID: ${item.id}</p>
        <p class="card-text">Description: ${item.description}</p>
        <p class="card-text">Price: $${item.price}</p>
        <p class="card-text">Code: ${item.code}</p>
        <p class="card-text">Stock: ${item.stock}</p>
        <p class="card-text">Category: ${item.category}</p>
        <p class="card-text">Status: ${item.status}</p>
        <button class="btn btn-danger" onclick="eliminarProducto('${item.id}')">Eliminar</button>
      
    `;
    contenedorProductos.appendChild(card);
  });
};


const eliminarProducto = (id) => {
  socket.emit("eliminarProducto", parseInt (id));
}

