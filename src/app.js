
import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import ProductManager from "./dao/db/product-manager-db.js";
import "./database.js"; 




const app = express();
const PUERTO = 8080;



const manager = new ProductManager();


app.use((req, res, next) => {
  req.manager = manager;
  next();
});


app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("./src/public"));


app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);



const httpServer = app.listen(PUERTO, () => {
  console.log(`Escuchando en el http://localhost:${PUERTO}`);
});

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Un cliente se comunica conmigo");

 
  socket.emit("productos", await manager.getProducts());

  
  socket.on("eliminarProducto", async (id) => {
    await manager.deleteProduct(parseInt(id));
    io.sockets.emit("productos", await manager.getProducts());
  });

  
  socket.on("nuevoProducto", async (producto) => {
    await manager.addProduct(producto);
    io.sockets.emit("productos", await manager.getProducts());
  });
});


