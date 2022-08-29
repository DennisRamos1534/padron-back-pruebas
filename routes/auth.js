/*
    path: api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, allUser, adminnew, admin, renovarAdminToken } = require('../controllers/auth');
const { validarCampos} = require('../middlewares/validar-campos');
// const admin = require('../models/admin');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('user','El usuario es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty().isLength({min: 5}),
    validarCampos
], crearUsuario);

router.post('/', [
    check('user','El usuario es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty().isLength({min: 5}),
    validarCampos
], loginUsuario);

router.post('/admin', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty().isLength({min: 4}),
    check('password', 'La contraseña es obligatoria').not().isEmpty().isLength({min: 4}),
    validarCampos
],admin);

router.post('/adminnew', [
    check('usuario', 'El usuario es obligatorio').not().isEmpty().isLength({min: 4}),
    check('nombre', 'El Nombre completo es obligatorio').not().isEmpty().isLength({min: 4}),
    check('password', 'La contraseña es obligatoria').not().isEmpty().isLength({min: 4}),
    validarCampos
],adminnew);

router.get('/adminrenovar', validarJWT, renovarAdminToken);
router.get('/all', allUser);


module.exports = router;