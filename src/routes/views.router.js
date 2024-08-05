import { Router } from "express";
import productRouter from "./products.router.js"; // Importa el router de productos
import cartsRouter from "./carts.router.js"; // Importa el router de carritos
import express from "express";
import multer from "multer";

const router = Router();

// Crear nuestra ruta
router.use("/api/products", productRouter);
router.use("/api/carts", cartsRouter);

// Prefijo Virtual: me permite organizarme mejor con las rutas y me proporciona una capa extra de seguridad.
router.use("/static", express.static("./src/public"));

// acá /products me muestra el listado total de mis productos, con express-handlebars
router.get("/products", async (req, res) => {
  try {
    const productos = await req.manager.getProducts();
    res.render("home", { productos });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// acá hay que hacer lo de mostrar los productos en tiempo real,
// con su formulario para agregar y botón de eliminar.

// para guardar imágenes con formato correcto, se crea un "storage".
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Creamos el middleware de carga:
const upload = multer({ storage: storage });

// ruta para subir imágenes
router.post("/imagenes", upload.single("imagen"), (req, res) => {
  res.send("imagen cargada");
});

export default router;
