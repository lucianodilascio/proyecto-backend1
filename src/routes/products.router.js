import express from "express";
const router = express.Router();
import ProductManager from "../dao/db/product-manager-db.js";
const manager = new ProductManager();



router.get("/", async (req, res) => {
    
        try{    
            const result = await manager.getProducts(req.query);
            res.send({ 
                result: "success", 
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.prevLink = result.hasPrevPage ? `http://localhost:8080/?page=${result.prevPage}` : null,
                nextLink: result.nextLink = result.hasNextPage ? `http://localhost:8080/?page=${result.nextPage}` : null,
                isValid: result.docs.length > 0
            });
            console.log(result)       
        }catch (error){
            res.send("Error en consultar los productos")
            console.log(error);
            }
});



router.get("/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const product = await manager.getProductById((id));
        if (!product) {
            res.status(404).json({ status: "error", message: "Product not found" });
        } else {
            res.json(product);
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error finding the product by ID" });
    }
});



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



router.put("/:pid", async (req, res) => {
    const id = (req.params.pid);
    const updatedProduct = req.body;

    try {
        await manager.updateProduct(id, updatedProduct);
        res.json({ status: "success", message: "Producto actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "error, no se pudo actualizar el producto" });
    }
});



router.delete("/:pid", async (req, res) => {
    const id = (req.params.pid);

    try {
        await manager.deleteProduct(id);
        res.json({ status: "success", message: "Producto eliminado satisfactoriamente" });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error en la eliminación del producto" });
    }
});

export default router;
