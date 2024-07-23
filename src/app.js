//1ero se importa el modulo
const express = require("express");
const productRouter = require("./routes/products.router.js");
//creamos una app de express
const cartsRouter = require ("./routes/carts.router.js");
const app = express();
const PUERTO = 8080;


//MIDDLEWARE

//podemos colocar una liena de codigo que nos ayuda a entender el formato JSON:
//hace que el servidor entienda y pueda usar el formato .JSON, entre el pedido y la respuesta del servidor.
app.use(express.json());

//crear nuestra ruta:

app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);


//CART

//app.get("/cart", (req, res)=> {

  //  res.send("seccion cart");
    //})

//a la raiz de la app

//app.get("/", (req, res) => {
//res.send("hola, hemos vuelto al home");

//})




//objeto REQUEST: req es un objeto que repersenta la peticion del cliente al servidor. este objeto contiene info sobre la peticion realizada, por ejemplo: url, metodo, parametro y querys

//req.params: esta propiedad contiene los parametros de la ruta.






app.listen (PUERTO, () => {
console.log(`escuchando en el http://localhost:${PUERTO}`);
})