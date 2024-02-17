<<<<<<< HEAD
const { Schema, model} = require('mongoose');

const RoleSchema = Schema ({
    role:{
=======
const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    role: {
>>>>>>> feature/login1
        type: String,
        required: [true, 'El role es obligatorio']
    }
});

module.exports = model('Role', RoleSchema);