import express from 'express';
import {
    Router
} from "express";
import {
    check
} from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { getInvoice, postInvoice } from "./invoice.controller.js";
import { validarCampos } from "../middlewares/validarCampos.js";

const router = express.Router();

router.get("/", validarJWT, getInvoice);

router.post(
    "/", [
        validarJWT,
        check("user", "The user is obligatory").not().isEmpty(),
        validarCampos,
    ],
    postInvoice
);

export default router;