import mongoose from "mongoose"


mongoose.connect("mongodb+srv://lucianodilascio14:coderluciano@cluster0.kdcns.mongodb.net/Storage?retryWrites=true&w=majority&appName=Cluster0")
.then(()=> console.log ("Conexión a la base de datos satisfactoria"))
.catch((error)=> console.log ("error en conectarse a la base de datos:", error))