import Role from '../roles/roles.model.js';
import User from '../users/user.model.js';

export const esRoleValido = async(role = '') => {
    const existeRol = await Role.findOne({ role });
    if (!existeRol) {
        throw new Error(`The role ${role} does not exist in the database`);
    }
}

export const existenteEmail = async(correo = '') => {
    const existeEmail = await User.findOne({ correo });
    if (existeEmail) {
        throw new Error(`The email ${correo} has already been registered`);
    }
}

export const existeUsuarioById = async(id = '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario) {
        throw new Error(`The ID: ${correo} Does not exist`);
    }
}