const { response } = require('express');
// const bcrypt = require('bcryptjs');

const Formulario = require('../models/form');

const crearForm = async (req, res = response) => {

    try {
        
        const formulario = new Formulario(req.body);

        await formulario.save(); // guarda en la db

        res.json({ 
            ok: true,
            formulario,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const allForm = async (req, res = response) => {

    try {
        const formularios = await Formulario.find();
        formularios.reverse();

        res.json({
            ok: true,
            formularios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const borrarUsuario = async (req, res = response) => {

    const {nombre} = req.body;
    try {
        const borrarFormulario = await Formulario.findOneAndDelete(nombre);

        res.json({
            ok: true,
            borrarFormulario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    crearForm,
    allForm,
    borrarUsuario
}