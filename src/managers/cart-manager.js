const fs = require("fs").promises;

class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.ultimoId = 0;

        //cargamos los carritos almacenados:
        this.cargarCarritos();

    }

    // se crean dos metodos auxiliares para leer y cargar archivos.

    async cargarCarritos() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);

            if (this.carts.lenght > 0)
                //minimo un elemento creado
                this.ultimoId = Math.max(...this.carts.map(cart => cart.id));
            //el metodo map hace que creemos un nuevo array que solo tenga los ultimos ID del carrito, y el math max obtenemos el mayor.

        } catch (error) {
            console.log("error al cargar los carritos", error);
            // si no existe el archivo, hay q crearlo.
            await this.guardarCarritos();
        }

    }


    async guardarCarritos() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));

    }

    //se crea el carrito
    async crearCarrito() {
        const nuevoCarrito = {
            id: ++this.ultimoId,
            products: []

        }

        this.carts.push(nuevoCarrito);

        await this.guardarCarritos();
        return nuevoCarrito;
    }

// hay q retornar carrito por ID

async getCarritoById(carritoId) {
    try {
        const carrito = this.carts.find(c => c.id === carritoId);

        if(!carrito) {
            throw new Error ("no existen carritos con ese ID")
        }
        return carrito;
    } catch (error) {
        console.log("error al obtener carrito por ID")
        throw error;
        
    }
}

//agregar los productos al cart

async agregarProductosAlCarrito(carritoId,productoId, quantity = 1) {

    const carrito = await this.getCarritoById(carritoId);
    const productExist = carrito.products.find(p=> p.product === productoId);

    if(productExist) {
        productExist.quantity += quantity;
    } else {
        carrito.products.push({product: productoId,quantity});
    }

    await this.guardarCarritos();
    return carrito;
}


}


module.exports = CartManager;