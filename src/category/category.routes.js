import {
    Router
} from "express";
import {
    check
} from "express-validator";
import {
    categoryGet,
    categoryPost,
    categoryPut,
    //getCategoryById,
    categoryDelete,
} from "./category.controller.js";
import {
    existeCategoryById,
} from "../helpers/db-validators.js";
import {
    validarCampos
} from "../middlewares/validarCampos.js";
import {
    validarJWT
} from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", categoryGet);

// router.get(
//     "/:id", [
//     check("id", "The ID entered is not valid").isMongoId(),
//     check("id").custom(existeUsuarioById),
//     validarCampos,
// ],
//     getUsuarioById
// );

router.post(
    "/", [
        validarJWT,
        check("categoria", "The category is required").not().isEmpty(),
        validarCampos,
    ],
    categoryPost
);

router.put(
    "/:id", [
        validarJWT,
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existeCategoryById),
        validarCampos,
    ],
    categoryPut
);

router.delete(
    "/:id", [
        validarJWT,
        check("id", "The ID entered is not valid").isMongoId(),
        check("id").custom(existeCategoryById),
        validarCampos,
    ],
    categoryDelete
);

export default router;