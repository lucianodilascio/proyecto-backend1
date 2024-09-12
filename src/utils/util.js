//Bcrypt libreria de hashing (ocultado) de contraseñas.
// 1) instalamos con npm install bcrypt
// 2) importamos el modulo

import bcrypt from "bcrypt";

//Conlleva 2 funciones:
// 1- createHash: aplica el hash al password
// 2- isValidPassword: compara el password proporcionado por la base de datos.

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//hashSync: toma el passowrd que le pasamos y aplica el "hasheo" a partir de un salt.

//Salt: string random aleatorio que se genera para poder hashear la contraseña y que el proceso sea impredecible

//(10): generará un salt de 10 caracteres (es el valor "generico").

//ES UN PROCESO IRREVESIBLE

const isValidPassword = (passowrd, user) => bcrypt.compareSync(passowrd, user.password);

//Al comparar passwords retorna TRUE o FALSE segun corresponda.

export {createHash, isValidPassword};


