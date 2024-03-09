import Carrito from '../shopCar/shopCar.model.js';
import Product from '../products/products.model.js';
import {
    validationResult
} from 'express-validator';

export const carritoPost = async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        nombreProducto,
        cantidad
    } = req.body;
    const usuario = req.usuario;

    try {
        if (usuario.role !== 'CLIENT_ROLE') {
            return res.status(403).json({
                error: 'Access denied'
            });
        }

        const product = await Product.findOne({
            nameProduct: nombreProducto
        });
        console.log({
            product
        })
        if (!product) {
            return res.status(404).json({
                msg: 'Product not found'
            });
        }

        if (product.stock < cantidad) {
            return res.status(400).json({
                msg: 'no stock'
            });
        }

        const precio = product.price;
        const total = cantidad * precio;

        const carritoExistente = await Carrito.findOne({
            user: usuario
        });

        if (carritoExistente) {
            const productoExistenteIndex = carritoExistente.productos.findIndex(product => product.nombreProducto === nombreProducto);

            if (productoExistenteIndex !== -1) {
                carritoExistente.productos[productoExistenteIndex].cantidad += cantidad;
                carritoExistente.productos[productoExistenteIndex].total += total;
            } else {
                carritoExistente.productos.push({
                    nombreProducto,
                    cantidad,
                    precio,
                    total
                });
            }

            await carritoExistente.save();

        } else {
            const nuevoCarrito = new Carrito({
                user: usuario,
                productos: [{
                    nombreProducto,
                    cantidad,
                    precio,
                    total
                }]
            });

            await nuevoCarrito.save();
        }

        product.stock -= cantidad;
        await product.save();

        return res.status(200).json({
            mensaje: 'Product added'
        });
    } catch (error) {
        console.error('Error when adding product to cart', error);
        res.status(500).json({
            msg: 'Server error'
        });
    }
};

export const getCarrito = async(req, res) => {
    const usuarioId = req.usuario._id;

    try {
        if (req.usuario.role !== 'CLIENT_ROLE') {
            return res.status(403).json({
                error: 'Access denied'
            });
        }

        const carrito = await Carrito.findOne({
            user: usuarioId
        }).populate('productos');

        if (!carrito) {
            return res.status(404).json({
                msg: 'No product was found'
            });
        }

        let precioTotal = 0;
        const productosEnCarrito = carrito.productos.map(producto => {
            const subtotal = producto.precio * producto.cantidad;
            precioTotal += subtotal;

            return {
                usuario: req.usuario.nombre,
                producto: producto.nombreProducto,
                cantidad: producto.cantidad,
                precio: producto.precio,
                subtotal: subtotal
            };
        });

        const carritoId = carrito._id;

        return res.status(200).json({
            carritoId,
            productosEnCarrito,
            precioTotal
        });
    } catch (error) {
        console.error('Error getting products in shop car', error);
        res.status(500).json({
            error: 'Server error'
        });
    }
};

export const deleteCarrito = async(req, res) => {
    const {
        nombreProducto
    } = req.query;
    const usuario = req.usuario;

    try {
        const carritoExistente = await Carrito.findOne({
            user: usuario
        });

        if (!carritoExistente) {
            return res.status(404).json({
                msg: 'No user found'
            });
        }

        const productoIndex = carritoExistente.productos.findIndex(item => item.name === nombreProducto);

        if (productoIndex === -1) {
            return res.status(404).json({
                msg: 'Product not found'
            });
        }

        const cantidad = carritoExistente.productos[productoIndex].cantidad;

        carritoExistente.productos.splice(productoIndex, 1);

        await carritoExistente.save();

        await Product.findOneAndUpdate({
            name: nombreProducto
        }, {
            $inc: {
                stock: cantidad
            }
        });

        return res.status(200).json({
            msg: 'Product removed'
        });

    } catch (error) {
        console.error('Error when removing product from shop car', error);
        res.status(500).json({
            msg: 'Server error'
        });
    }
};