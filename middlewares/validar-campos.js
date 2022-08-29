const { validationResult } = require("express-validator");
const Usuario = require('../models/usuario');

const validarCampos = (req, res, next) => {

    const errores = validationResult(req);

    if(!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
    next();
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
}

module.exports = {
    validarCampos,
    existeUsuarioPorId
}