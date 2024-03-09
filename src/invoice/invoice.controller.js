import Invoice from './invoice.model.js';
import Sale from '../sale/sale.model.js';
import Product from '../products/products.model.js';

export const postInvoice = async(req, res) => {
    try {
        const usuario = req.usuario;

        if (usuario.role !== 'CLIENT_ROLE') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const { saleId } = req.body;

        if (!saleId) {
            return res.status(400).json({ error: 'Sales ID is obligatory' });
        }

        const sale = await Sale.findById(saleId);

        if (!sale) {
            return res.status(404).json({ error: 'The specified sale was not found' });
        }

        const product = await Product.findById(sale.product);

        if (!product) {
            return res.status(404).json({ error: 'The product associated with the sale was not found' });
        }

        const total = sale.cantidad * product.price;

        const nuevaFactura = new Invoice({
            user: usuario.nombre,
            sale: sale.product,
            total: total
        });

        await nuevaFactura.save();

        res.status(201).json({ factura: nuevaFactura });
    } catch (error) {
        console.error('Error creating invoice', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getInvoice = async(req, res) => {
    try {
        const usuario = req.usuario;

        const invoice = await Invoice.findOne({ user: usuario.nombre }).populate('sale').exec();

        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }

        res.status(200).json({ factura: invoice });
    } catch (error) {
        console.error('Error obtaining invoice', error);
        res.status(500).json({ error: 'Server error' });
    }
};