// Importar módulos
import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import ProductManager from "./managers/product-manager.js";
import mongoose from "mongoose";


// Crear una app de express
const app = express();
const PUERTO = 8080;
import alimentosRouter from "./routes/alimentos.router.js";

// Crear instancia de ProductManager
const manager = new ProductManager("./src/data/products.json");

// Middleware para añadir manager a req
app.use((req, res, next) => {
  req.manager = manager;
  next();
});

// Configurar Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("./src/public"));

// Usar routers
app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

app.use("/alimentos", alimentosRouter)

const httpServer = app.listen(PUERTO, () => {
  console.log(`Escuchando en el http://localhost:${PUERTO}`);
});

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Un cliente se comunica conmigo");

  // Enviar productos al cliente
  socket.emit("productos", await manager.getProducts());

  // Manejar evento de eliminar producto
  socket.on("eliminarProducto", async (id) => {
    await manager.deleteProduct(parseInt(id));
    io.sockets.emit("productos", await manager.getProducts());
  });

  // Manejar evento de agregar producto
  socket.on("nuevoProducto", async (producto) => {
    await manager.addProduct(producto);
    io.sockets.emit("productos", await manager.getProducts());
  });
});


mongoose.connect("mongodb+srv://lucianodilascio14:coderluciano@cluster0.kdcns.mongodb.net/Almacen?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log ("Conección a la base de datos satisfactoria"))
.catch((error)=> console.log ("error en conectarse a la base de datos:", error))