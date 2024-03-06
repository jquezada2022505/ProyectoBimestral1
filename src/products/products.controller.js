import {
    response,
    request
} from "express";
import bcryptjs from 'bcryptjs';
import Product from './products.model.js';

export const productsGet = async(req = request, res = response) => {
        const {
            limite,
            desde
        } = req.query;
        const query = {
            estado: true
        };
        const [total, products] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            products
        });
    }
    ////


export const getOutOfStockProducts = async(req, res, next) => {
    try {
        const outOfStockProducts = await Product.find({
            stock: 0
        });
        res.json(outOfStockProducts);
    } catch (error) {
        next(error);
    }
};


// Función para obtener los productos más vendidos
// export const getBestSellingProducts = async(req, res) => {
//     const {
//         limite = 10, desde = 0
//     } = req.query;
//     const query = {
//         estado: true,
//         stock: {
//             $gt: 0
//         }
//     };

//     try {
//         const [total, product] = await Promise.all([
//             Product.countDocuments(query),
//             Product.find(query)
//             .sort({
//                 stock: 1
//             })
//             .populate('category')
//             .skip(Number(desde))
//             .limit(Number(limite))
//         ]);

//         res.status(200).json({
//             total,
//             product
//         });

//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             msg: "Server Error"
//         });
//     };
// };
export const getBestSellingProducts = async(req, res) => {
    const { limite = 10, desde = 0 } = req.query;

    try {
        const products = await Product.find({ estado: true })
            .sort({ sales: -1 }) // Ordenar por ventas descendentes
            .skip(Number(desde))
            .limit(Number(limite))
            .populate('category');

        res.status(200).json({
            total: products.length,
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server Error" });
    }
};
/////

export const productsPost = async(req, res) => {
    const {
        nameProduct,
        descProduct,
        stock,
        price,
        category
    } = req.body;

    const usuario = req.usuario;

    if (usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({
            error: 'Only admin users can edit products'
        });
    }

    try {
        const product = new Product({
            nameProduct,
            descProduct,
            stock,
            price,
            category
        });

        await product.save();

        res.status(201).json({
            msg: "Product created successfully",
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error creating product"
        });
    }
};

export const getProductById = async(req, res) => {
    const {
        id
    } = req.params;
    const product = await Product.findOne({
        _id: id
    });

    res.status(200).json({
        product
    })
}

export const productsPut = async(req, res = response) => {
    const {
        nameProduct,
        descProduct,
        stock,
        price,
        category
    } = req.body;
    const usuario = req.usuario;
    const {
        id
    } = req.params;
    const {
        _id,
        ...resto
    } = req.body;

    if (usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({
            error: 'Only admin users can edit products'
        });
    }

    await Product.findByIdAndUpdate(id, resto);

    const product = await Product.findOne({
        _id: id
    });

    res.status(200).json({
        msg: 'Updated Category',
        product
    });
}

export const productsDelete = async(req, res) => {
    const {
        id
    } = req.params;

    const product = await Product.findByIdAndUpdate(id, {
        estado: false
    });
    const productAutenticated = req.usuario;

    res.status(200).json({
        msg: 'Product to delete',
        product,
        productAutenticated
    });
};