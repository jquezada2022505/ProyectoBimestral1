import express from 'express';
import {
    createInvoiceItem,
    getAllInvoiceItems,
    getInvoiceItemById,
    updateInvoiceItemById,
    deleteInvoiceItemById
} from './invoiceItem.controller.js';

const router = express.Router();

// Ruta para crear un ítem de factura
router.post('/invoice-items', createInvoiceItem);

// Ruta para obtener todos los ítems de factura
router.get('/invoice-items', getAllInvoiceItems);

// Ruta para obtener un ítem de factura por su ID
router.get('/invoice-items/:id', getInvoiceItemById);

// Ruta para actualizar un ítem de factura por su ID
router.put('/invoice-items/:id', updateInvoiceItemById);

// Ruta para eliminar un ítem de factura por su ID
router.delete('/invoice-items/:id', deleteInvoiceItemById);

export default router;