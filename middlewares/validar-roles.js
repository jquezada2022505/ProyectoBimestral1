const { response } = require("express");


const esAdminRole = (req, res, next) => {
<<<<<<< HEAD
    if(!req.usuario){
=======
    if (!req.usuario) {
>>>>>>> feature/login1
        return res.status(500).json({
            msg: "Se desea validar un usuario sin validar token primero"
        });
    }

<<<<<<< HEAD
    const { role, nombre } =  req.usuario;

    if(role !== "ADMIN_ROLE"){
=======
    const { role, nombre } = req.usuario;

    if (role !== "ADMIN_ROLE") {
>>>>>>> feature/login1
        return res.status(401).json({
            msg: `${nombre} no es un administrador, no puede usar este endpoint`
        });
    };
    next();
}

const tieneRolAutorizado = (...roles) => {
<<<<<<< HEAD
    return (req =request, res = response, next) =>{
        if(!req.usuario){
=======
    return (req = request, res = response, next) => {
        if (!req.usuario) {
>>>>>>> feature/login1
            return res.status(500).json({
                msg: "Se desea validar un usuario sin validar token primero"
            });
        }
<<<<<<< HEAD
    
        if(!roles.includes(req.usuario.role)){
=======

        if (!roles.includes(req.usuario.role)) {
>>>>>>> feature/login1
            return res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles autorizados ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRolAutorizado
}