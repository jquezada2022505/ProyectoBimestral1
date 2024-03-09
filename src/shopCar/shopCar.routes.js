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
    carritoPost,
    getCarrito,
    deleteCarrito,
} from '../shopCar/shopCar.controller.js'

const router = Router();

router.get("/", validarJWT, getCarrito);

router.post(
    "/", [
        validarJWT,
        check("nombreProducto", "The product is obligatory").not().isEmpty(),
        check("cantidad", "The amount is mandatory").not().isEmpty(),
    ],
    carritoPost
);

router.delete("/DeleteShopCar", validarJWT, deleteCarrito);

export default router;