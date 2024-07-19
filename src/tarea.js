const fs = require("fs").promises;
class ProductManager {
    static ultId = 0;
    constructor(path) {
        this.products = [];
        this.path = path;

    }

   async addProduct(title, description, price, img, code, stock) {

        //validación y si las pasa se crea el objeto con el id autoincrementable
        if (!title || !description || !price || !img || !code || !stock) {
            console.log("todos los campos son obligatorios");
            return;
        }

        //validar que el codigo sea UNICO

        if (this.products.some(item => item.code === code)) {

            console.log(" el codigo debe ser unico");
            return;
        }

        //ahora si, se crea el nuevo objeto:

        const nuevoProducto = {

            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        }

        //Una vez creado, lo agregamos al array

        this.products.push(nuevoProducto);

        // ultimo paso, lo metemos a un archivo

        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
    }




   async getProducts() {
        const respuesta = await fs.readFile(this.path, "utf-8");
        const arrayProductos = JSON.parse(respuesta);
        return arrayProductos;
        
        
        //return this.products;
    }

    getProductById(id) {

        //buscar el producto por ID
        const productoBuscado = this.products.find(item => item.id === id);

        if (!productoBuscado) {
            console.log("not found");
        } else {
            console.log(productoBuscado);

        }
    }



}








//testeo:
// se crea una instancia de la clase "ProductManager"

const manager = new ProductManager("./src/productos.json");

// se llamara "getProducts" recien creada la instancia, tiene que devolver un array vacio []

//console.log(manager.getProducts());

// se llamará al metodo "addProduct" con los campos :
//title: "producto prueba"
//description: "este es un producto prueba"
//price: 200
//thumbnail: "sin imagen"
//code: "abc123"
//stock: 25

//manager.addProduct("arroz", " marolio", 200, "sin imagen", "abc123", 25);


//console.log(manager.getProducts());

//manager.addProduct("producto prueba 2", "este es un producto godines", 500, "sin imagen", "abc1234", 50);

// ahora chequear que se agregó:

//console.log(manager.getProducts());

//Se evalua que getProductById devuelva error si no encuentra el producto, o devuelva el producto en caso de encontrarlo

//console.log("-- verificamos por ID --");

//manager.getProductById(100);

const testearMostrarProductos = async () => {
await console.log(manager.getProducts());
}

testearMostrarProductos();



