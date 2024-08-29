import { Router } from "express";
const router = Router();
//importante importar el Model, que es el que me comunica con la base de datos.
import AlimentosModel from "../dao/models/product.model.js";

// 1- lo primero que hay que hacer es obtener el listado de todos los alimentos.

router.get("/", async (req, res) => {

    try {
        const listadoAlimentos = await AlimentosModel.find();
        res.send(listadoAlimentos); 
    } catch (error) {
        res.status(500).send("Error interno en el servidor al recibir listado de alimentos.");
    }

})

//2- Por postman agregamos un nuevo producto:

router.post("/", async (req, res)=> {

    const nuevoProducto = req.body;

    try {
        const nuevoDocumento = new AlimentosModel(nuevoProducto);
        await nuevoDocumento.save();
        res.send("producto creado correctamente")
    } catch (error) {
        res.status(500).send("Error al crear el producto")
    }
})


//3- Actualizamos a un producto por su ID: 
router.put("/:id", async (req, res) => {
let idBuscado = req.params.id;
let nuevosDatos = req.body;

try {
    const productId = await AlimentosModel.findByIdAndUpdate(idBuscado, nuevosDatos)

    if (!productId){
        return res.status(400).send("producto no encontrado");
    }

    res.status(201).send("producto actualizado correctamente")
} catch (error) {
    res.status(500).send("error al actualizar un producto")
}

})


// 4- eliminamos un producto (por ID tambien):

router.delete("/:id", async (req, res) =>{
let idBuscado = req.params.id;

try {
    const productId = await AlimentosModel.findByIdAndDelete(idBuscado);
    if (!productId) {
        return res.status(400).send("producto no encontrado");
    }
    res.status(200).send("producto eliminado correctamente")
} catch (error) {
    res.status(500).send("error del servidor al eliminar el producto")
}

})




export default router;