const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const { request, response } = require('express');

<<<<<<< HEAD
const validarJWT = async(req = request, res = response, next)=> {
    const token = req.header('x-token');

    if(!token){
=======
const validarJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
>>>>>>> feature/login1
        return res.status(401).json({
            msg: 'No hay token en la petición',
        });
    }

<<<<<<< HEAD
    try{
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if(!usuario){
=======
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
>>>>>>> feature/login1
            return res.status(401).json({
                msg: "Usuario no existe en la base de datos"
            });
        }

<<<<<<< HEAD
        if(!usuario.estado){
=======
        if (!usuario.estado) {
>>>>>>> feature/login1
            return res.status(401).json({
                msg: "Token no válido, usuario con estado false"
            });
        }

        req.usuario = usuario;
        next();
<<<<<<< HEAD
        
    }catch(e){
=======

    } catch (e) {
>>>>>>> feature/login1
        console.log(e);
        res.status(401).json({
            msg: "Token no válido"
        })
    }
<<<<<<< HEAD
} 
=======
}
>>>>>>> feature/login1

module.exports = {
    validarJWT
}