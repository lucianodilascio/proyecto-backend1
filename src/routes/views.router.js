import { Router } from "express";
import productRouter from "./products.router.js"; // Importa el router de productos
import cartsRouter from "./carts.router.js"; // Importa el router de carritos
import express from "express";
import multer from "multer";
const router = Router();




const arrayProductos = [
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
      }
     
] 


// Crear nuestra ruta
router.use("/api/products", productRouter);
router.use("/api/carts", cartsRouter);





//Prefijo Virtual: me permite organizarme mejor con las rutas y me proporciona una capa extra de seguridad.
router.use("/static", express.static("./src/public"));

router.get ("/", (req,res) => {
  res.render("index", {titulo: "TODO COMIDAS"});
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



router.post ("/imagenes", upload.single("imagen"),  (req, res)=> {
  
  res.send("imagen cargada");
  
})


export default router; 