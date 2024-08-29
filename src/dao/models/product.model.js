import mongoose from "mongoose";


//definir el "schema"
// es un objeto que nos permite definir la forma de los docs. se configura el nombre de los campos, y los tipos de datos que van a almacenar.

const productSchema = new mongoose.Schema({


    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    code: {
        type: String,
        required: true,
        unique: true,
    },

    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    thumbnails: {
        type: [String]
    }
})

//Ahora se define el  Model:
// El model es como una gran clase, me permite conectarme con la colección de alimentos en este caso, a partir de esta clase puedo crear nuevos documentos para la coleccion alimentos. o tambien puedo retornar todo ese listado de docs, o tambien actualizar y/o eliminar alguno. En conclusión, es el punto de entrada para la base de datos.

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;


