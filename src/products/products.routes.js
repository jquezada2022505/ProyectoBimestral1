import {
    Router
} from "express";
import {
    check
} from "express-validator";
import {
    productsGet,
    productsPost,
    getProductById,
    productsPut,
    productsDelete,
    getOutOfStockProducts,
    getBestSellingProducts,
    bestSellingProductClient,
    productsByCategory,
    ProductsByName
} from "./products.controller.js";
import {
    existeProductById,
} from "../helpers/db-validators.js";
import {
    validarCampos
} from "../middlewares/validarCampos.js";
import {
    validarJWT
} from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", productsGet);

router.get('/out-of-stock', getOutOfStockProducts);

router.get('/best-selling', getBestSellingProducts);

router.get('/best-selling-client', validarJWT, bestSellingProductClient);

router.get('/by-category/:category', productsByCategory);

router.get('/search', ProductsByName);

router.get(
    "/:id", [
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existeProductById),
        validarCampos,
    ],
    getProductById
);

router.post(
    "/", [
        validarJWT,
        check("nameProduct", "The product name is required").not().isEmpty(),
        check("descProduct", "The description product is required").not().isEmpty(),
        check("stock", "The stock is required").not().isEmpty(),
        check("category", "The category is required").not().isEmpty(),
        validarCampos,
    ],
    productsPost
);

router.put(
    "/:id", [
        validarJWT,
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existeProductById),
        validarCampos,
    ],
    productsPut
);

router.delete(
    "/:id", [
        validarJWT,
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existeProductById),
        validarCampos,
    ],
    productsDelete
);

export default router;