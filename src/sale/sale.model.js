import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SaleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
});

export default mongoose.model('Sale', SaleSchema);