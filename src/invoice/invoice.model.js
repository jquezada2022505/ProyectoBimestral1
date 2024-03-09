import mongoose from "mongoose";

const Schema = mongoose.Schema;

const InvoiceSchema = new Schema({
    user: {
        //type: Schema.Types.ObjectId,
        type: String,
        ref: "User",
        required: true,
    },
    sale: {
        //type: Schema.Types.ObjectId,
        type: String,
        ref: "Sale",
        required: true,
    },
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Invoice', InvoiceSchema);