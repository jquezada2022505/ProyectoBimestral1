import mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema({
    invoice_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice'
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
});

const InvoiceItem = mongoose.model('InvoiceItem', invoiceItemSchema);

export default InvoiceItem;