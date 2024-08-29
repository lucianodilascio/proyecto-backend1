import express from "express";
const router = express.Router();

import CartManager from "../dao/db/cart-manager-db.js";
const cartManager = new CartManager();

// Crear un nuevo carrito
router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({ status: "success", cart: newCart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Obtener todos los carritos
router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Obtener un carrito por ID
router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    try {
        const cart = await cartManager.getCartById(cartId);
        if (!cart) {
            res.status(404).json({ status: "error", message: "Cart not found" });
        } else {
            res.json(cart);
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Agregar productos al carrito
router.post("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1; // Default to 1 if no quantity provided

    try {
        const updatedCart = await cartManager.addProductsCart(cartId, productId, quantity);
        res.json({ status: "success", cart: updatedCart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Eliminar producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    try {
        const updatedCart = await cartManager.removeProductFromCart(cartId, productId);
        if (!updatedCart) {
            res.status(404).json({ status: "error", message: "Cart or product not found" });
        } else {
            res.json({ status: "success", cart: updatedCart });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Actualizar el carrito con un arreglo de productos
router.put("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    const products = req.body.products; 

    try {
        const updatedCart = await cartManager.updateCart(cartId, products);
        if (!updatedCart) {
            res.status(404).json({ status: "error", message: "Cart not found" });
        } else {
            res.json({ status: "success", cart: updatedCart });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Actualizar la cantidad del producto en el carrito
router.put("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    try {
        const updatedCart = await cartManager.updateProductQuantity(cartId, productId, quantity);
        if (!updatedCart) {
            res.status(404).json({ status: "error", message: "Cart or product not found" });
        } else {
            res.json({ status: "success", cart: updatedCart });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// Eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const updatedCart = await cartManager.clearCart(cartId);
        if (!updatedCart) {
            res.status(404).json({ status: "error", message: "Cart not found" });
        } else {
            res.json({ status: "success", cart: updatedCart });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

export default router;



