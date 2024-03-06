import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    nameProduct: {
        type: String,
        required: [true, "The name product is obligatory"],
    },
    descProduct: {
        type: String,
        required: [true, "The description product is obligatory"],
    },
    stock: {
        type: Number,
        required: [true, "The stock is obligatory"],
    },
    price: {
        type: String,
        required: [true, "The price is obligatory"],
    },
    sales: {
        type: Number,
        default: 0 // Inicializar a 0
    },
    category: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: "category",
        required: [true, "The category is obligatory"],
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Product', ProductSchema);