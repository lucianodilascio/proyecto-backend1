
import express from "express";
import exphbs from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import ProductManager from "./dao/db/product-manager-db.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import sessionsRouter from "./routes/sessions.router.js"
import "./database.js"; 
//Passport:
import passport from "passport";
import initializePassport from "./config/passport.config.js";
//import FileStore from "session-file-store";
//se inicializa de la siguiente forma:
//const fileStore = FileStore(session);

// Para lograr peristencia de las sesiones con File Storage:
//1) instalamos:  npm i session-file-store
//2)importamos el modulo
//3) Lo inicializamos conectado a la session.

//Trabajamos con MongoDB:
//1) instalamos: npm install connect-mongo
//2) Importamos y configuramos el middleware.


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
app.use(cookieParser());
app.use(session({
  //valor para firmar las cookies
  secret: "cookieValue",

  //esto permite mantener la sesion activa frente a la inactividad del usuario.
  resave: true,

  //me permite guardar cualquier sesion, aun cuando el objeto de sesion no tenga nada para contener.
  saveUninitialized: true,

  //2) Utilizando FileStorage:

  //store: new fileStore({path: "./src/sessions", ttl: 1000, retries: 1})
  //path: la ruta donde se guardan los archivos session.
  //ttl: time to live (va en segundos, para ver cuanto vive la session)
  //retries: cantidad de veces que el servidor va a intentar leer el archivo.

  //3) Utilizando Mongo Storage:

  store: MongoStore.create({
mongoUrl: "mongodb+srv://lucianodilascio14:coderluciano@cluster0.kdcns.mongodb.net/Storage?retryWrites=true&w=majority&appName=Cluster0", ttl: 100
  })
}));

//cambios de Passport: 
initializePassport();
app.use(passport.initialize());
app.use(passport.session());


app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);



const httpServer = app.listen(PUERTO, () => {
  console.log(`Escuchando en el http://localhost:${PUERTO}`);
});

 


