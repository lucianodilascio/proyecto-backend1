//1ero se importa el modulo
import express from "express"

//creamos una app de express
const app = express();
const PUERTO = 8080;

//crear nuestra ruta:

//PRODUCTS

//app.get("/products", (req, res)=> {

//res.send("seccion products");
//})

//CART

app.get("/cart", (req, res)=> {

    res.send("seccion cart");
    })

//a la raiz de la app

app.get("/", (req, res) => {
res.send("hola, hemos vuelto al home");

})

//dejamos al servidor escuchando

app.listen(PUERTO, () => {
    console.log("escuchando perfectamente");
})



//objeto REQUEST: req es un objeto que repersenta la peticion del cliente al servidor. este objeto contiene info sobre la peticion realizada, por ejemplo: url, metodo, parametro y querys

//array de productos: 

const misProductos = [

    {id: 1, nombre: "Fideos", precio: 150},

    {id: 2, nombre: "Arroz", precio: 250},

    {id: 3, nombre: "Pan", precio: 350},

    {id: 4, nombre: "Leche", precio: 450},

    {id: 5, nombre: "Galletitas", precio: 550},

    {id: 6, nombre: "Vino", precio: 650}

]


//podemos colocar una liena de codigo que bos ayuda a entender el formato JSON:
//hace que el servidor entienda y pueda usar el formato .JSON, entre el pedido y la respuesta del servidor.
app.use(express.json());



//ruta products:

app.get("/products", (req,res) => {
res.json(misProductos);

})

//req.params: esta propiedad contiene los parametros de la ruta.


//pedimos producto por ID

app.get("/products/:id", (req, res) => {
//me guardo el parametro
let id = req.params.id;  //todo lo q viene de PARAMS es un STRING, y yo en el id tengo un number, por lo tanto no puede ser === (estrictamente igual), salvo si parseamos.

//una vez q tengo el id, puedo buscarlo en el array
let productoBuscado = misProductos.find(producto => producto.id == id);

//si no lo encuentro, tiro el error
if (!productoBuscado) {
    res.send ("producto no encontrado, id incorrecto")
    //si lo encuentro, se lo envio al cliente
} else {
    res.json(productoBuscado);
}


})










//1ero se importa el modulo

//import http  from "http";

//2do se crea el servidor web, utilizamos el metodo createServer() del modulo HTTP. este metodo recibe como parametro una funcion callback que se ejecuta cada vez que se realiza una peticion al servidor. recibe 2 parametros:  request y response.

//const server = http.createServer( (request, response)=> {
//response.end("Mi primer hola mundo en backend, modificado el mensaje, hecho de nuevo!!");

//})
 

//3ero hay que poner a ESCUCHAR al servidor en un PUERTO.


//server.listen(PUERTO, () => {
//    console.log(`Escuchando en el puerto:  ${PUERTO}`);
//}  )



