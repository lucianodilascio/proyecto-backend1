// Importar módulos usando import
import express from "express";
import exphbs from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";


// Crear una app de express
const app = express();
const PUERTO = 8080;

// MIDDLEWARE

// Hacer que el servidor entienda y pueda usar el formato .JSON, entre el pedido y la respuesta del servidor
//Prefijo Virtual: me permite organizarme mejor con las rutas y me proporciona una capa extra de seguridad.
app.use(express.json());
app.use("/static", express.static("./src/public"));

//Configuramos Express-Handlebars

app.engine("handlebars", exphbs.engine());
// configuramos motor  de plantillas, que cuando express encuentre un archivo con la extension de .handlebars , lo renderice utilizando este mismo motor.
app.set("view engine", "handlebars");
// por ulitmo le decimos donde estan estos archivos con la extension "handlebars"
app.set("views", "./src/views");




app.use ("/", viewsRouter);

const httpServer = app.listen(PUERTO, () => {
  console.log(`escuchando en el http://localhost:${PUERTO}`);
})

const io = new Server(httpServer); 


//array de productos: 

const productos = [
  {
    "id": 1, 
    "title": "arroz blanco",
    "description": "Marolio",
    "price": 200,
    "img": "sin imagen",
    "code": "abc123",
    "stock": 25,
    "category": "arroz",
    "status": "true"
  },
  {
    "id": 2,
    "title": "fideos italianos",
    "description": "Barilla",
    "price": 150,
    "img": "sin imagen",
    "code": "def456",
    "stock": 30,
    "category": "pasta",
    "status": "true"
  },
  {
    "id": 3,
    "title": "aceite de oliva",
    "description": "Extra virgen",
    "price": 500,
    "img": "sin imagen",
    "code": "ghi789",
    "stock": 15,
    "category": "aceite",
    "status": "true"
  }
]



io.on("connection", (socket) => {

  console.log("un cliente se comunica con migo");


//no olvidar el nombre del evento  a escuchar, el mismo que se envia desde el cliente.
  socket.on ("mensaje", (data) => {
console.log(data);

  })

  //ahora desde el backend mandar un saludo al front

  socket.emit("saludito", "hola cliente como le va?");


//envio al front el array de productos:


socket.emit("productos", productos);

})