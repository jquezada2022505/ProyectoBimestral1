<<<<<<< HEAD
const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
=======
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
>>>>>>> feature/login1
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
<<<<<<< HEAD
    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img:{
        type: String
    },
    role:{
=======
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    role: {
>>>>>>> feature/login1
        type: String,
        require: true,
        enum: ["ADMIN_ROLE", "CLIENT_ROLE"]
    },
<<<<<<< HEAD
    estado:{
        type: Boolean,
        default: true
    },
    google:{
=======
    estado: {
        type: Boolean,
        default: true
    },
    google: {
>>>>>>> feature/login1
        type: Boolean,
        default: false
    }
});

<<<<<<< HEAD
UsuarioSchema.methods.toJSON = function(){
    const{ __v, password, _id, ...usuario} = this.toObject();
=======
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
>>>>>>> feature/login1
    usuario.uid = _id;
    return usuario;
};

module.exports = model('Usuario', UsuarioSchema);