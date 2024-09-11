import { Router } from "express";
const router = Router();
import UserModel from "../dao/models/user.model.js";

//ruta POST para generar un nuevo usuario:

router.post("/register", async (req, res) => {
    let { first_name, last_name, email, password, age } = req.body;

    try {
        //verificar si el correo ya esta registrado:
        const userExists = await UserModel.findOne({email: email });

        if (userExists) {
            return res.send("el correo ya está registrado");
        }

        //crear nuevo usuario

        const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            password,
            age
        })

        //almacenar los datos del usuario en la session:
        
        req.session.user = {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email
        }

        req.session.login = true;

        res.status(201).send("usuario creado con exito")


    } catch (error) {
        res.status(500).send("error interno en el servidor", error)
    }
})




export default router;