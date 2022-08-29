const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const Admin = require('../models/admin');
const { generarAdminJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const {user, password} = req.body;

    try {
        const existeUsuario = await Usuario.findOne({user});
        if(existeUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El Usuario ya esta registrado',
            });
        }
        const usuarioDB = new Usuario(req.body);

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        usuarioDB.password = bcrypt.hashSync(password, salt);

        await usuarioDB.save(); // guarda en la db

        res.json({ 
            ok: true,
            usuario: usuarioDB,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const loginUsuario = async (req, res = response) => {

    const {user, password} = req.body;

    try {
        const usuarioDB = await Usuario.findOne({user});
        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El Usuario no esta registrado',
            });
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es correcta',
            });
        }

        res.json({ 
            ok: true,
            usuario: usuarioDB,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const allUser = async (req, res = response) => {

    try {
        const usuarios = await Usuario.find();
        usuarios.reverse();

        res.json({
            ok: true,
            usuarios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const adminnew = async (req, res = response) => {

    const {usuario, password} = req.body;

    try {
        
        const existeUsuario = await Admin.findOne({usuario});
        if(existeUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya esta registrado'
            });
        }

        const admin = new Admin(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        admin.password = bcrypt.hashSync(password, salt);

        await admin.save();

        // Generar mi JWT
        const token = await generarAdminJWT(admin.id);

        res.json({
            ok: true,
            admin,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const admin = async(req, res = response) => {

    const {usuario, password} = req.body;

    try {
        
        const adminDB = await Admin.findOne({usuario});
        if(!adminDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }

        // Validar el password
        const validPassword = bcrypt.compareSync(password, adminDB.password);
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            })
        }

        // Generar JWT
        const token = await generarAdminJWT(adminDB.id);

        res.json({
            ok: true,
            admin: adminDB,
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const renovarAdminToken = async(req, res = response) => {

    const uid = req.uid;
    // Generar JWT
    const token = await generarAdminJWT(uid);
    // Obtener el usuario por ID
    const admin = await Admin.findById(uid);


    res.json({
        ok: true,
        admin,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    allUser,
    adminnew,
    admin,
    renovarAdminToken
}