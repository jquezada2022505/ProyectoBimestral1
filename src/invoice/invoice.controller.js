import Invoice from './invoice.model.js';

// Controlador para crear una nueva factura
export const createInvoice = async(req, res) => {
    try {
        const { user_id, total } = req.body;
        const invoice = new Invoice({ user_id, total });
        await invoice.save();
        res.status(201).json({ message: 'Factura creada con éxito', invoice });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la factura', error: error.message });
    }
};

// Controlador para obtener todas las facturas
export const invoicesGet = async(req, res) => {
    try {
        const invoices = await Invoice.find().populate('user_id'); // Obtener todas las facturas y poblar los datos del usuario asociado
        res.status(200).json(invoices); // Devolver las facturas encontradas en formato JSON
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las facturas', error: error.message }); // Manejar errores
    }
};

// Controlador para obtener una factura por su ID
export const getInvoiceById = async(req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la factura', error: error.message });
    }
};

// Controlador para actualizar una factura
export const updateInvoice = async(req, res) => {
    try {
        const { user_id, total } = req.body;
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, { user_id, total }, { new: true });
        if (!invoice) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }
        res.status(200).json({ message: 'Factura actualizada con éxito', invoice });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la factura', error: error.message });
    }
};

// Controlador para eliminar una factura
export const deleteInvoice = async(req, res) => {
    try {
        const invoice = await Invoice.findByIdAndDelete(req.params.id);
        if (!invoice) {
            return res.status(404).json({ message: 'Factura no encontrada' });
        }
        res.status(200).json({ message: 'Factura eliminada con éxito', invoice });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la factura', error: error.message });
    }
};