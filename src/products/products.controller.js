import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Product from './products.model.js';

export const productsGet = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
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

export const productsPost = async (req, res) => {
    const { nameProduct, descProduct, stock, price, category} = req.body;

    const usuario = req.usuario;

    if (usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({ error: 'Only admin users can edit products' });
    }

    try {
        const product = new Product({ nameProduct, descProduct, stock, price, category});
        
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

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    res.status(200).json({
        product
    })
}

export const productsPut = async (req, res = response) => {
    const {  nameProduct, descProduct, stock, price, category } = req.body;
    const usuario = req.usuario;
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    if (usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({ error: 'Only admin users can edit products' });
    }

    await Product.findByIdAndUpdate(id, resto);

    const product = await Product.findOne({ _id: id });

    res.status(200).json({
        msg: 'Updated Category',
        product
    });
}