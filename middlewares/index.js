const validarCampos = require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validar-jwt');
const esAdminRole = require('../middlewares/validar-roles');
const tieneRolAutorizado = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...esAdminRole,
    ...tieneRolAutorizado
}