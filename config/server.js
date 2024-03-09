'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import {
    dbConnection
} from './mongo.js';
import userRoutes from '../src/users/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import Usuario from '../src/users/user.model.js';
import categoryRoutes from '../src/category/category.routes.js';
import productsRoutes from '../src/products/products.routes.js';
import invoiceRoutes from '../src/invoice/invoice.route.js';
import saleRoutes from '../src/sale/sale.routes.js';
import shopCarRoutes from '../src/shopCar/shopCar.routes.js';
import bcryptjs from 'bcryptjs';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios'
        this.authPath = '/api/auth'
        this.categoryPath = '/api/category'
        this.productPath = '/api/products'
        this.invoicePath = '/api/invoice'
        this.salePath = '/api/sale'
        this.shopCarPath = '/api/shopCar'

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
        const lengthUsuario = await Usuario.countDocuments()
        if (lengthUsuario > 0) return;

        const salt = bcryptjs.genSaltSync();
        const password = bcryptjs.hashSync('123456', salt);

        const adminUsuario = new Usuario({
            nombre: "admin",
            correo: "admin@gmail.com",
            password,
            role: "ADMIN_ROLE"
        })

        adminUsuario.save();

    }


    middlewares() {
        this.app.use(express.urlencoded({
            extended: false
        }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));

    }

    routes() {
        this.app.use(this.usuarioPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.categoryPath, categoryRoutes);
        this.app.use(this.productPath, productsRoutes);
        this.app.use(this.invoicePath, invoiceRoutes);
        this.app.use(this.salePath, saleRoutes);
        this.app.use(this.shopCarPath, shopCarRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }

}
export default Server;