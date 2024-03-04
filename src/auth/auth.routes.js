import { Router } from "express";
import { check } from "express-validator";

import { login, signUp } from "./auth.controller.js";
import { validarCampos } from "../middlewares/validarCampos.js";
import {
    existenteEmail,
} from "../helpers/db-validators.js";

const router = Router()
router.post(
    '/signUp', [
    check('nombre', 'This is not a valid email').not().isEmpty(),
    check('correo', 'This is not a valid email').isEmail(),
    check('password', 'The password is obligatory').not().isEmpty(),
    check("correo").custom(existenteEmail),
    validarCampos,
], signUp)

router.post(
    '/login', [
    check('correo', 'This is not a valid email').isEmail(),
    check('password', 'The password is obligatory').not().isEmpty(),
    validarCampos,
], login)

export default router

