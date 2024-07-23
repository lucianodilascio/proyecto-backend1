const fs = require("fs").promises;
class ProductManager {
    static ultId = 0;
    constructor(path) {
        this.products = [];
        this.path = path;

        this.cargarArray();

    }

    async cargarArray() {
        try {
            this.products = await this.leerArchivo();
        } catch (error) {
            console.log("Error al inicializar ProductManager");
        }
    }

    async addProduct({ title, description, price, img, code, stock, status, category, id }) {

        //validación y si las pasa se crea el objeto con el id autoincrementable
        if (!title || !description || !price || !img || !code || !stock || !category || !status || !id) {
            console.log("todos los campos son obligatorios");
            return;
        }

        //validar que el codigo sea UNICO

        if (this.products.some(item => item.code === code)) {

            console.log(" el codigo debe ser unico");
            return;
        }

        //ahora si, se crea el nuevo objeto:
        const lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        const nuevoProducto = {

            id: lastProductId + 1,
            title,
            description,
            price,
            img,
            code,
            stock,
            category,
            status
        }

        //Una vez creado, lo agregamos al array

        this.products.push(nuevoProducto);

        // se guardará en el archivo:

        await this.guardarArchivo(this.products);
    }




    async getProducts() {
        try {
            const arrayProductos = await this.leerArchivo();
            return arrayProductos;

        } catch (error) {
            console.log("error al leer el archivo", error);

        }

    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);

            if (!buscado) {
                console.log("producto no encontrado");
                return null;
            } else {
                console.log("producto encontrado");
                return buscado
            }

        } catch (error) {
            
            console.log("error al buscar por id", error);
        }

    }

//Métodos auxiliares: 
async leerArchivo() {
    const respuesta = await fs.readFile(this.path, "utf-8");
    const arrayProductos = JSON.parse(respuesta);
    return arrayProductos;
}

async guardarArchivo(arrayProductos) {
    await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
}

}






module.exports = ProductManager; 