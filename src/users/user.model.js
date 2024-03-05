import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "The name is required"],
    },
    correo: {
        type: String,
        required: [true, "Email is mandatory"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "CLIENT_ROLE"],
        default: "CLIENT_ROLE",
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model('User', UserSchema);