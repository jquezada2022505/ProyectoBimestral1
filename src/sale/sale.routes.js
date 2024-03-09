import {
    Router
} from "express";
import {
    check
} from "express-validator";
import {
    validarJWT
} from "../middlewares/validar-jwt.js";
import {
    validarCampos
} from "../middlewares/validarCampos.js";
import {
    salePost,
    getSale
} from "./sale.controller.js";

const router = Router();

router.get("/", validarJWT, getSale)

router.post(
    "/", [
        validarJWT,
        check("product", "The product is obligatory").not().isEmpty(),
        check("cantidad", "The amount is obligatory").isInt({
            min: 1
        }),
        validarCampos,
    ],
    salePost
);


export default router;