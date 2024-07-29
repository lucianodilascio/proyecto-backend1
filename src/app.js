// Importar módulos usando import
import express from "express";
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import multer from "multer";

// Crear una app de express
const app = express();
const PUERTO = 8080;

// MIDDLEWARE

// Hacer que el servidor entienda y pueda usar el formato .JSON, entre el pedido y la respuesta del servidor
app.use(express.json());

// Crear nuestra ruta
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);

// CART
// app.get("/cart", (req, res)=> {
//     res.send("seccion cart");
// })

// A la raíz de la app
// app.get("/", (req, res) => {
//     res.send("hola, hemos vuelto al home");
// })

// Objeto REQUEST: req es un objeto que representa la petición del cliente al servidor. Este objeto contiene info sobre la petición realizada, por ejemplo: url, método, parámetros y queries

// req.params: esta propiedad contiene los parámetros de la ruta.

app.listen(PUERTO, () => {
    console.log(`escuchando en el http://localhost:${PUERTO}`);
})

//Prefijo Virtual: me permite organizarme mejor con las rutas y me proporciona una capa extra de seguridad.
app.use("/static", express.static("./src/public"));



//para guardar imagenes con formato correcto, se crea un "storage".

const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, "./src/public/img")
  } ,
  filename : (req, file, cb) => {
    cb(null, file.originalname);
  }
})



//Creamos el middleware de carga:

//const upload = multer({dest: "./src/public/img"});

const upload = multer({storage: storage});


//ruta para subir imagenes



app.post ("/imagenes", upload.single("imagen"),  (req, res)=> {

  res.send("imagen cargada");

})

//si son varias imagenes, se reemplaza "single" por "array", yo obviamente en postman seleccionamos todas las imgs a subir.