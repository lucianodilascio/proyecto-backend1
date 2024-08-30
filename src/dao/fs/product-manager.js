import { promises as fs } from "fs";

class ProductManager {
    static lastId = 0;
    constructor(path) {
        this.products = [];
        this.path = path;

        this.loadArray();
    }

    async loadArray() {
        try {
            this.products = await this.readFile();
        } catch (error) {
            console.log("Error al inicializar ProductManager");
        }
    }

    async addProduct({ title, description, price, code, stock, status, category,  }) {
        
        if (!title || !description || !price || !code || !stock || !category || !status ) {
            console.log("Todos los campos son obligatorios");
            return;
        }
    
        
        await this.loadArray();
    
        
        if (this.products.some(item => item.code === code)) {
            console.log("El código debe ser único");
            return;
        }
    
        
        const lastProductId = this.products.length > 0 ? this.products[this.products.length - 1].id : 0;
        const newProduct = {
            id: lastProductId + 1,
            title,
            description,
            price,
            code,
            stock,
            category,
            status
        };
    
        
        this.products.push(newProduct);
        await this.saveFile(this.products);
        console.log("Producto agregado correctamente");
    }
    

    async getProducts() {
        try {
            const productArray = await this.readFile();
            return productArray;
        } catch (error) {
            console.log("Error al leer el archivo", error);
        }
    }

    async getProductById(id) {
        try {
            const productArray = await this.readFile();
            const foundProduct = productArray.find(item => item.id === id);

            if (!foundProduct) {
                console.log("Producto no encontrado");
                return null;
            } else {
                console.log("Producto encontrado");
                return foundProduct;
            }
        } catch (error) {
            console.log("Error al buscar producto por ID", error);
        }
    }

    
    async readFile() {
        const response = await fs.readFile(this.path, "utf-8");
        const productArray = JSON.parse(response);
        return productArray;
    }

    async saveFile(productArray) {
        await fs.writeFile(this.path, JSON.stringify(productArray, null, 2));
    }

    
    async updateProduct(id, updatedProduct) {
        try {
            const productArray = await this.readFile(); 

            const index = productArray.findIndex(item => item.id === id); 

            if (index !== -1) {
                productArray[index] = { ...productArray[index], ...updatedProduct }; 
                await this.saveFile(productArray); 
                console.log("Producto actualizado"); 
            } else {
                console.log("No se encuentra el producto"); 
            }
        } catch (error) {
            console.log("Tenemos un error al actualizar productos"); 
        }
    }

    
    async deleteProduct(id) {
        try {
            const productArray = await this.readFile(); 

            const index = productArray.findIndex(item => item.id === id); 

            if (index !== -1) {
                productArray.splice(index, 1); 
                await this.saveFile(productArray); 
                console.log("Producto eliminado"); 
            } else {
                console.log("No se encuentra el producto"); 
            }
        } catch (error) {
            console.log("Tenemos un error al eliminar productos"); 
        }
    }
}

export default ProductManager;

