import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    total: {
        type: Number,
        ref: 'total'
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;