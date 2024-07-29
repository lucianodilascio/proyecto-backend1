import express from "express";
import CartManager from "../managers/cart-manager.js";

const router = express.Router();
const cartManager = new CartManager("./src/data/carts.json");

// Necesito una ruta POST que cree un carrito
router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.json(newCart);
    } catch (error) {
        res.status(500).send("Error del servidor, acción denegada");
    }
});

// Se listan los productos del carrito que sea:
router.get("/:cid", async (req, res) => {
    let cartId = parseInt(req.params.cid);

    try {
        const cart = await cartManager.getCartById(cartId);
        res.json(cart.products);
    } catch (error) {
        res.status(500).send("error, no se pudo obtener el producto del carrito");
    }
});

// y por ultimo agregar productos al carrito
router.post("/:cid/product/:pid", async (req, res) => {
    let cartId = parseInt(req.params.cid);
    let productId = req.params.pid;
    let quantity = req.body.quantity || 1;

    try {
        const cartUpdated = await cartManager.addProductsCart(cartId, productId, quantity);
        res.json(cartUpdated.products);
    } catch (error) {
        res.status(500).send("error al agregar producto al carrito");
    }
});

export default router;
