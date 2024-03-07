// Rutas de la factura (invoiceRoutes.mjs)
import express from 'express';
import {
    createInvoice,
    invoicesGet,
    getInvoiceById,
    updateInvoice,
    deleteInvoice
} from './invoice.controller.js';

const router = express.Router();

// Ruta para crear una nueva factura
router.post('/invoices', createInvoice);

// Ruta para obtener todas las facturas
router.get('/invoices', invoicesGet);

// Ruta para obtener una factura por su ID
router.get('/invoices/:id', getInvoiceById);

// Ruta para actualizar una factura
router.put('/invoices/:id', updateInvoice);

// Ruta para eliminar una factura
router.delete('/invoices/:id', deleteInvoice);

export default router;