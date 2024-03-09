import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema({
    category: {
        type: String,
        required: [true, "The category is obligatory"],
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('category', CategorySchema);