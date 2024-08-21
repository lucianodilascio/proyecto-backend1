import mongoose from "mongoose";


//definir el "schema"
// es un objeto que nos permite definir la forma de los docs. se configura el nombre de los campos, y los tipos de datos que van a almacenar.

const alimentosSchema = new mongoose.Schema({


    title: String,
    description: String,
    price: Number,
    code: String,
    stock: Number,
    category: String



})

//Ahora se define el  Model:
// El model es como una gran clase, me permite conectarme con la colección de alimentos en este caso, a partir de esta clase puedo crear nuevos documentos para la coleccion alimentos. o tambien puedo retornar todo ese listado de docs, o tambien actualizar y/o eliminar alguno. En conclusión, es el punto de entrada para la base de datos.

const AlimentosModel = mongoose.model("alimentos", alimentosSchema);

export default AlimentosModel;


