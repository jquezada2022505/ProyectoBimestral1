import { Router } from "express";
import { check } from "express-validator";
import {
    usuariosGet,
    usuariosPost,
    getUsuarioById,
    usuariosPut,
    usuariosDelete,
} from "./user.controller.js";
import {
    existenteEmail,
    existeUsuarioById,
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", usuariosGet);

router.get(
    "/:id", [
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos,
    ],
    getUsuarioById
);

router.post(
    "/", [
        check("nombre", "The name is required").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({
            min: 6,
        }),
        check("correo", "The email entered is not valid ").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ],
    usuariosPost
);

router.put(
    "/:id", [
        validarJWT,
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos,
    ],
    usuariosPut
);

router.delete(
    "/:id", [
        validarJWT,
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos,
    ],
    usuariosDelete
);

export default router;