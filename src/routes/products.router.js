import express from "express";
import ProductManager from "../managers/product-manager.js";
const manager = new ProductManager("./src/data/products.json");
const router = express.Router();

// PRODUCTS

router.get("/", async (req, res) => {
    const limit = req.query.limit;

    try {
        const productArray = await manager.getProducts();
        if (limit) {
            res.json(productArray.slice(0, limit));
        } else {
            res.json(productArray);
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Internal server error" });
    }
});

// Get product by ID

router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const product = await manager.getProductById(parseInt(id));
        if (!product) {
            res.status(404).json({ status: "error", message: "Product not found" });
        } else {
            res.json(product);
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error finding the product by ID" });
    }
});

// Add a new product

router.post("/", async (req, res) => {
    const newProduct = req.body;

    try {
        await manager.addProduct(newProduct);
        res.status(201).json({ status: "success", message: "Producto agregado correctamente" });
    } catch (error) {
        if (error.message === "El código debe ser único") {
            res.status(400).json({ status: "error", message: "El código debe ser único" });
        } else {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
});

// Update a product

router.put("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const updatedProduct = req.body;

    try {
        await manager.updateProduct(id, updatedProduct);
        res.json({ status: "success", message: "Producto actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "error, no se pudo actualizar el producto" });
    }
});

// Delete a product

router.delete("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);

    try {
        await manager.deleteProduct(id);
        res.json({ status: "success", message: "Producto eliminado satisfactoriamente" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error en la eliminación del producto" });
    }
});

export default router;
