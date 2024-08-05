// Importar módulos usando import
import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import ProductManager from "./managers/product-manager.js";

// Crear una app de express
const app = express();
const PUERTO = 8080;

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
app.use("/static", express.static("./src/public"));

// Usar routers
app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

const httpServer = app.listen(PUERTO, () => {
  console.log(`escuchando en el http://localhost:${PUERTO}`);
});

const io = new Server(httpServer);

// Conectar clientes y enviar productos en tiempo real


io.on("connection", async (socket) => {
  console.log("un cliente se comunica conmigo");

  socket.on("mensaje", (data) => {
    console.log(data);
  });

  try {
    const productos = await manager.getProducts();
    socket.emit("productos", productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }

  socket.emit("saludito", "hola cliente como le va?");
});
