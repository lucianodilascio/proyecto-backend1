import { Router } from "express";
const router = Router();
import UserModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/util.js";

//ruta POST para generar un nuevo usuario:

router.post("/register", async (req, res) => {
    let { first_name, last_name, email, password, age } = req.body;

    try {
        //verificar si el correo ya esta registrado:
        const userExists = await UserModel.findOne({ email: email });

        if (userExists) {
            return res.send("el correo ya está registrado");
        }

        //crear nuevo usuario

        const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            password: createHash(password),
            age
        })

        //almacenar los datos del usuario en la session:

        req.session.user = {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            age: newUser.age
        }

        req.session.login = true;

        res.redirect ("/profile");


    } catch (error) {
        res.status(500).send("error interno en el servidor", error)
    }
})


//ruta para el login

router.post("/login", async (req, res) => {
    let { email, password } = req.body;

    try {
        const searchedUser = await UserModel.findOne({ email: email });
        if (searchedUser) {
            //if (searchedUser.password === password) {
            if(isValidPassword(password, searchedUser)){
                req.session.user = {
                    first_name: searchedUser.first_name,
                    last_name: searchedUser.last_name,
                    email: searchedUser.email,
                    age: searchedUser.age
                }

                req.session.login = true;

                res.redirect("/profile");


            } else {
                res.status(401).send("Contraseña incorrecta");
            }

        } else {
            res.status(404).send("Usuario no encontrado");
        }
    } catch (error) {
        console.error("error durante el login: ", error)
        res.status(500).send("error interno en el servidor");
    }

})

// Ruta para logout

router.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})




export default router;