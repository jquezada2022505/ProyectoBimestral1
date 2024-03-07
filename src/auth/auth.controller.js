import bcryptjs from 'bcryptjs';
import Usuario from '../users/user.model.js'
import {
    generarJWT
} from '../helpers/generate-jwt.js';

export const login = async(req, res) => {
    const {
        correo,
        password
    } = req.body;

    try {
        const usuario = await Usuario.findOne({
            correo
        });

        if (!usuario) {
            return res.status(400).json({
                msg: "Incorrect credentials, Email does not exist in the database",
            });
        }
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "The user does not exist in the database",
            });
        }
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Password is incorrect",
            });
        }
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: 'Login',
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contact administrator",
        });
    }
}

export const signUp = async(req, res) => {

    const {
        nombre,
        correo,
        password
    } = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password
    });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.status(200).json({
        usuario
    });
}