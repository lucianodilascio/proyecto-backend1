const express = require("express");
const ProductManager = require("../managers/product-manager.js");
const manager = new ProductManager("./src/data/products.json");
const router = express.Router();

// PRODUCTS

router.get("/", async (req, res) => {
    const limit = req.query.limit;

    try {
        const productArray = await manager.getProducts();

        if (limit) {
            res.send(productArray.slice(0, limit));
        } else {
            res.send(productArray);
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
});

// Get product by ID

router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const product = await manager.getProductById(parseInt(id));

        if (!product) {
            res.send("Product not found");
        } else {
            res.send(product);
        }
    } catch (error) {
        res.send("Error finding the product by ID");
    }
});

// Add a new product

router.post("/", async (req, res) => {
    const newProduct = req.body;

    try {
        await manager.addProduct(newProduct);
        res.status(201).send("Producto agregado correctamente");
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// actualizar producto
router.put("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const updatedProduct = req.body;

    try {
        await manager.updateProduct(id, updatedProduct);
        res.send("Producto actualizado correctamente");
    } catch (error) {
        res.status(500).send("error, no se pudo actualizar el producto");
    }
});

// eliminar el producto:
router.delete("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);

    try {
        await manager.deleteProduct(id);
        res.send("Producto eliminado satisfactoriamente");
    } catch (error) {
        res.status(500).send("Error en la eliminación del producto");
    }
});



module.exports = router;
