import { request, response } from "express";
import InvoiceItem from './invoiceItem.model.js';

// Controlador para crear un nuevo ítem de factura
export const createInvoiceItem = async(req, res) => {
    try {
        // Crear un nuevo ítem de factura utilizando los datos del cuerpo de la solicitud
        const { quantity, price } = req.body;
        const newInvoiceItem = await InvoiceItem.create({ quantity, price });

        // Enviar una respuesta con el nuevo ítem de factura creado
        res.status(201).json(newInvoiceItem);
    } catch (error) {
        // Manejar cualquier error que ocurra durante la creación del ítem de factura
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener todos los ítems de factura
// export const getAllInvoiceItems = async(req = request, res = response) => {
//     try {
//         const invoiceItems = await InvoiceItem.find();
//         res.status(200).json(invoiceItems);
//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// };

export const getAllInvoiceItems = async(req, res) => {
    try {
        // Utiliza el método find() para obtener todos los elementos del modelo InvoiceItem
        const invoiceItems = await InvoiceItem.find().populate('invoice_id').populate('product_id');
        res.status(200).json(invoiceItems); // Devuelve los elementos encontrados
    } catch (error) {
        res.status(500).json({ message: error.message }); // Devuelve un error si ocurre algún problema
    }
};

// Controlador para obtener un ítem de factura por su ID
export const getInvoiceItemById = async(req, res) => {
    try {
        const invoiceItem = await InvoiceItem.findById(req.params.id);
        if (!invoiceItem) {
            return res.status(404).json({
                message: 'Invoice item not found'
            });
        }
        res.status(200).json(invoiceItem);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Controlador para actualizar un ítem de factura por su ID
export const updateInvoiceItemById = async(req, res) => {
    try {
        const updatedInvoiceItem = await InvoiceItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!updatedInvoiceItem) {
            return res.status(404).json({
                message: 'Invoice item not found'
            });
        }
        res.status(200).json(updatedInvoiceItem);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Controlador para eliminar un ítem de factura por su ID
export const deleteInvoiceItemById = async(req, res) => {
    try {
        const deletedInvoiceItem = await InvoiceItem.findByIdAndDelete(req.params.id);
        if (!deletedInvoiceItem) {
            return res.status(404).json({
                message: 'Invoice item not found'
            });
        }
        res.status(200).json({
            message: 'Invoice item deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};