import { promises as fs } from "fs";

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.lastId = 0;

        // Cargar los carritos almacenados
        this.loadCarts();
    }

    // Métodos auxiliares para leer y escribir archivos

    async loadCarts() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);

            if (this.carts.length > 0) {
                // Al menos un elemento creado
                this.lastId = Math.max(...this.carts.map(cart => cart.id));
            }
        } catch (error) {
            console.log("Error al cargar los carritos", error);
            // Si el archivo no existe, crearlo
            await this.saveCarts();
        }
    }

    async saveCarts() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    // Crear un nuevo carrito
    async createCart() {
        const newCart = {
            id: ++this.lastId,
            products: []
        };

        this.carts.push(newCart);

        await this.saveCarts();
        return newCart;
    }

    // Obtener carrito por ID
    async getCartById(cartId) {
        try {
            const cart = this.carts.find(c => c.id === cartId);

            if (!cart) {
                throw new Error("No se encontró un carrito con ese ID");
            }
            return cart;
        } catch (error) {
            console.log("Error al obtener carrito por ID");
            throw error;
        }
    }

    // Agregar productos al carrito
    async addProductsCart(cartId, productId, quantity = 1) {
        const cart = await this.getCartById(cartId);
        const productExist = cart.products.find(p => p.product === productId);

        if (productExist) {
            productExist.quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await this.saveCarts();
        return cart;
    }
}

export default CartManager;


