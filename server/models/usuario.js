/*
Jerarquía de Modelos:
    -Schema
    -Model
    -Document(instance of Model)

    Example:
    const mongoose = require('mongoose'); //importa librería
    let Schema = mongoose.Schema;         //instancia clase Schema
    let usuarioSchema = new Schema({});   //crea un schema nuevo
    mongoose.model('Usuario', usuarioSchema);  //crea un model nuevo llamado Usuario a partir del Schema usuarioSchema
   
    let usuario = new Usuario({  //crea un documento (instancia) del modelo Usuario
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

*/


const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //sirve para hacer un mejor handling de los errores generados por la clave unique, 
// hace un pre-validación. Obtenés un error de validación de Mongoose en vez del error E11000 de MongoDB


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};


let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


//reemplaza el método toJSON de usuarioSchema para devolver el mismo objeto sin el atributo password
usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;

}



usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);