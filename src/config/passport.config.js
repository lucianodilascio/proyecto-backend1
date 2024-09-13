// Instalamos: npm install passport passport-local
//se importa los modulos
import passport from "passport";
import local from "passport-local";

//hay q traer UserModel y las funciones de Bycrpt:
import UserModel from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils/util.js";


const LocalStrategy = local.Strategy;

const initializePassport = () => {

    //estrategia para el REGISTER

    passport.use("register", new LocalStrategy({
        //1ero le digo que quiero tener acceso al objeto req
        passReqToCallback: true,
        usernameField: "email",
    }, async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;

        try {
            //verificamos si ya existe un registro con ese email
            let user = await UserModel.findOne({ email });

            if (user) return done(null, false);

            //en caso de que no exista, se crea un registro de usuario nuevo

            let newUser = {
                first_name,
                last_name,
                email,
                age,
                password: createHash(password)
            }

            let result = await UserModel.create(newUser);
            //si todo sale bien, se manda el DONE con el usuario generado.
            return done(null, result);
        } catch (error) {
            return done(error);
        }

    }));


    //estrategia para el LOGIN 

    passport.use("login", new LocalStrategy({
        usernameField: "email"
    }, async (email, password, done) => {
        try {
            //para el login primero verifico que el usuario EXISTA con ese email, mediante un !if (que si no existe, retorne el console.log negativo y el done (null,false).)
            const user = await UserModel.findOne({ email });
            if (!user) {
                console.log("este usuario no existe");
                return done(null, false);
            }
            //si existe verificamos la contraseña (tambien con un !if, que si da false tire error. y si no retorne correctamente con el password): 
            if (!isValidPassword(password, user)) return done(null, false);
            return done(null, user);
        } catch (error) {
            return done(error);
        }

    }))

    passport.serializeUser((user,done) => {
        done (null, user._id);
    })

    passport.deserializeUser(async (id,done) => {
        let user = await UserModel.findById({_id: id});
        done (null, user);
    })


}

export default initializePassport;