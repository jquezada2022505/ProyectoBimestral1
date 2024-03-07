import User from '../users/user.model.js';
import Category from '../category/category.model.js';
import Product from '../products/products.model.js';

export const existenteEmail = async(correo = '') => {
    const existeEmail = await User.findOne({
        correo
    });
    if (existeEmail) {
        throw new Error(`The email ${correo} has already been registered`);
    }
}

export const existeUsuarioById = async(id = '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario) {
        throw new Error(`The ID: ${correo} Does not exist`);
    }
}

export const existeCategoryById = async(id = '') => {
    const existeCategoria = await Category.findById(id);
    if (!existeCategoria) {
        throw new Error(`The category: ${categoria} Does not exist`);
    }
}

export const existeProductById = async(id = '') => {
    const existeProducto = await Product.findById(id);
    if (!existeProducto) {
        throw new Error(`The product: ${nameProduct} Does not exist`);
    }
}