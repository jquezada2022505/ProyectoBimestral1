const { Router } = require('express');
const { check } = require('express-validator');

<<<<<<< HEAD
//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRole, tieneRolAutorizado } = require('../middlewares/validar-roles');

const { validarCampos, validarJWT, esAdminRole, tieneRolAutorizado } = require('../middlewares');

const { 
    usuariosPost,
    usuariosGet, 
    getUsuarioById,
    putUsuarios,
    usuariosDelete} = require('../controllers/user.controller');

const { existenteEmail, esRoleValido, existeUsuarioById } = require('../helpers/db-validators');
=======
const { validarCampos } = require('../middlewares/validarCampos');


const {
    usuariosPost,
    usuariosGet,
    getUsuarioById,
    putUsuarios,
    usuariosDelete
} = require('../controllers/user.controller');

const { existenteEmail, existeUsuarioById } = require('../helpers/db-validators');
>>>>>>> feature/login1

const router = Router();

router.get("/", usuariosGet);

router.get(
<<<<<<< HEAD
    "/:id",
    [
=======
    "/:id", [
>>>>>>> feature/login1
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ], getUsuarioById);

router.put(
<<<<<<< HEAD
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        check("role").custom(esRoleValido),
=======
    "/:id", [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioById),
>>>>>>> feature/login1
        validarCampos
    ], putUsuarios);

router.post(
<<<<<<< HEAD
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password","El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo","Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRoleValido),
=======
    "/", [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
>>>>>>> feature/login1
        validarCampos,
    ], usuariosPost);

router.delete(
<<<<<<< HEAD
    "/:id",
    [   
        validarJWT,
        //esAdminRole,
        tieneRolAutorizado('ADMIN_ROLE','SUPER_ROLE'),
=======
    "/:id", [
>>>>>>> feature/login1
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ], usuariosDelete);

module.exports = router;