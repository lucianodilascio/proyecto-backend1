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

// Ruta para mostrar productos en tiempo real
router.get("/realtimeproducts", async (req, res) => {
  try {
    const productos = await req.manager.getProducts();
    res.render("realtimeproducts", { productos });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Ruta para mostrar todos los productos, con express-handlebars
router.get("/products", async (req, res) => {
  try {
    const productos = await req.manager.getProducts();
    res.render("home", { productos });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Configuración de multer para cargar imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/public/img");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/imagenes", upload.single("imagen"), (req, res) => {
  res.send("Imagen cargada");
});

export default router;
