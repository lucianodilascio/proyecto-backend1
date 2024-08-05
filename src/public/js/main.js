console.log("estoy bien conectado")

//instancia de socket.io desde el front

const socket = io();

//cuando quiero enviar un msj es mediante : EMIT
//cuando quiero escuchar un msj es mediante: ON
//estos mensajes se reflejan mediante "eventos"

socket.emit("mensaje", "hola backend acá desde el front")

//ahora escuchamos el msj del backend

socket.on ("saludito", (data) => {
    console.log(data)
})

//recibimos el array del servidor

socket.on("productos", (arrayProductos)=> {
const listaProductos = document.getElementById("lista-productos");

arrayProductos.forEach(producto => {
    listaProductos.innerHTML += `<li> ${producto.title} - ${producto.description} - ${producto.price} - </li>`;
}) 

})