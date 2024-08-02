// Importar módulos usando import
import express from "express";
import productRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import multer from "multer";
import exphbs from "express-handlebars";

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






// Crear nuestra ruta
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);




app.listen(PUERTO, () => {
    console.log(`escuchando en el http://localhost:${PUERTO}`);
})

//Prefijo Virtual: me permite organizarme mejor con las rutas y me proporciona una capa extra de seguridad.
app.use("/static", express.static("./src/public"));

app.get ("/", (req,res) => {
  res.render("index");
} )

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