import ProductModel from "../models/product.model.js";

class ProductManager {


    async addProduct({ title, description, price, code, img, stock, status, category, thumbnails }) {
        try {
            // Validación de campos obligatorios
            if (!title || !description || !price || !code || !stock || !category || !status || !thumbnails) {
                console.log("Todos los campos son obligatorios");
                return;
            }

            //validacion nueva
            const productExist = await ProductModel.findOne({ code: code });
            if (productExist) {
                console.log("el codigo debe ser unico");
                return;
            }

            // crear el nuevo producto

            const newProduct = new ProductModel({
                title,
                description,
                price,
                code,
                stock,
                category,
                status: true,
                img,
                thumbnails: thumbnails || []
            });

            await newProduct.save();

        } catch (error) {
            console.log("no se pudo agregar el producto: ", error);
            return null;
        }
    }


    async getProducts() {
        try {
            const productArray = await ProductModel.find();
            return productArray;
        } catch (error) {
            console.log("Error al obtener los productos", error);
        }
    }

    async getProductById(id) {
        try {
            const product = await ProductModel.findById(id);
            if (!product) {
                console.log("producto no encontrado");
                return null;
            }
            return product;
        } catch (error) {
            console.log("Error al buscar producto por ID", error);
        }
    }


    // Método para actualizar un producto existente
    async updateProduct(id, updatedProduct) {
        try {
            const updated = await ProductModel.findByIdAndUpdate(id, updatedProduct);

            if (!updated) {

                console.log("no se puede encontrar el producto");
                return null;
            }
            return updated;
        } catch (error) {
            console.log("Tenemos un error al actualizar productos ", error);
        }
    }

    // Método para borrar productos
    async deleteProduct(id) {
        try {
            const deleted = await ProductModel.findByIdAndDelete(id);

            if (!deleted) {

                console.log("no se puede encontrar el producto");
                return null;
            }
            console.log("producto eliminado correctamente") 
        } catch (error) {
            console.log("Tenemos un error al eliminar productos ", error);
        }
    }
}

export default ProductManager;