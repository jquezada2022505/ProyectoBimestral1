import { response, request } from "express";
import bcryptjs from 'bcryptjs';
import Category from '../category/category.model.js';

export const categoryGet = async (req = request, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };
    const [total, category] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        category
    });
}

export const categoryPost = async (req, res) => {
    const { categoria } = req.body;

    const usuario = req.usuario;

    if (usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({ error: 'Only admin users can edit categories' });
    }

    try {
        const category = new Category({ categoria });
        await category.save();

        res.status(201).json({
            msg: "Category created successfully",
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error creating category"
        });
    }
};

export const categoryPut = async (req, res = response) => {
    const { categoria } = req.body;
    const usuario = req.usuario;
    const { id } = req.params;
    const { _id, ...resto } = req.body;

    if (usuario.role !== 'ADMIN_ROLE') {
        return res.status(403).json({ error: 'Only admin users can edit categories' });
    }

    await Category.findByIdAndUpdate(id, resto);

    const category = await Category.findOne({ _id: id });

    res.status(200).json({
        msg: 'Updated Category',
        category
    });
}

// export const categoryDelete = async (req, res) => {
//     const { id } = req.params;

//     const category = await category.findByIdAndUpdate(id, { estado: false });
//     const categoryAutenticated = req.category;

//     res.status(200).json({ msg: 'Category to delete', category, categoryAutenticated });
// }

export const categoryDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const categoriaPredeterminada = await Category.findOne({ nombre: 'productsEliminados' });
        if (!categoriaPredeterminada) {
            return res.status(404).json({ msg: 'Default category "productsEliminados" not found' });
        }

        const category = await Category.findByIdAndUpdate(id, { estado: false }, { new: true });

        await Product.updateMany({ categoria: id }, { categoria: categoriaPredeterminada._id });

        res.status(200).json({ msg: 'Category deleted and products transferred to "productsEliminados"', category });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Error while deleting category and transferring products' });
    }
}