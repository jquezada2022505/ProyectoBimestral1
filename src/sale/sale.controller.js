import Sale from '../sale/sale.model.js';
import Product from '../products/products.model.js';
import User from '../users/user.model.js';

export const salePost = async(req, res) => {
    try {
        const usuario = req.usuario;

        if (usuario.role !== 'CLIENT_ROLE') {
            return res.status(403).json({
                error: 'Access denied'
            });
        }

        const {
            product,
            cantidad
        } = req.body;

        const foundProduct = await Product.findOne({
            nameProduct: product
        });

        if (!foundProduct) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        if (foundProduct.stock < cantidad) {
            return res.status(400).json({
                error: 'stock not available'
            });
        }

        const totalCompra = foundProduct.price * cantidad;

        const nuevaVenta = new Sale({
            product: foundProduct._id,
            user: usuario._id,
            cantidad
        });

        await nuevaVenta.save();

        foundProduct.stock -= cantidad;
        await foundProduct.save();

        const usuarioCompra = await User.findById(usuario._id);
        const correoUsuarioCompra = usuarioCompra.correo;

        const ventaData = {
            _id: nuevaVenta._id,
            producto: foundProduct.nameProduct,
            cantidad,
            total: totalCompra,
            estado: nuevaVenta.estado,
            correoUsuario: correoUsuarioCompra,
        };

        res.status(200).json({
            venta: ventaData
        });
    } catch (error) {
        console.error('Error creating sale', error);
        res.status(500).json({
            error: 'Error in server'
        });
    }
};

export const getSale = async(req, res) => {
    try {
        const usuario = req.usuario;

        if (usuario.role !== 'CLIENT_ROLE') {
            return res.status(403).json({
                error: 'Access denied'
            });
        }

        const sales = await Sale.find({
            user: usuario.id
        }).populate('product').exec();

        if (sales.length === 0) {
            return res.status(404).json({
                error: 'no sales for this user'
            });
        }

        const user = await User.findById(usuario.id);

        const ventasData = sales.map(venta => ({
            _id: venta._id,
            producto: venta.product.name,
            cantidad: venta.cantidad,
            total: venta.cantidad * venta.product.price,
            estado: venta.estado,
            correoUsuario: user.correo,
        }));

        res.status(200).json({
            ventas: ventasData
        });
    } catch (error) {
        console.error('Error getting sales', error);
        res.status(500).json({
            error: 'Error in server'
        });
    }
};