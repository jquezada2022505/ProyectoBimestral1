import mongoose from "mongoose";

const shopCarSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productos: [{
        nombreProducto: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        precio: {
            type: Number
        },
        subtotal: {
            type: Number
        }
    }]
});

export default mongoose.model('shopCar', shopCarSchema);