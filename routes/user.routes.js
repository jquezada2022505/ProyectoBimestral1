const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');


const {
    usuariosPost,
    usuariosGet,
    getUsuarioById,
    putUsuarios,
    usuariosDelete
} = require('../controllers/user.controller');

const { existenteEmail, existeUsuarioById } = require('../helpers/db-validators');

const router = Router();

router.get("/", usuariosGet);

router.get(
    "/:id", [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ], getUsuarioById);

router.put(
    "/:id", [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ], putUsuarios);

router.post(
    "/", [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6 }),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ], usuariosPost);

router.delete(
    "/:id", [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeUsuarioById),
        validarCampos
    ], usuariosDelete);

module.exports = router;