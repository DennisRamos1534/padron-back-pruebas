/*
    path: api/form
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearForm, allForm, borrarUsuario } = require('../controllers/form');
const { validarCampos} = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('edad','La edad es obligatoria').not().isEmpty(),
    check('sexo','El sexo es obligatorio').not().isEmpty(),
    check('colonia','La colonia es obligatoria').not().isEmpty(),
    check('seccion','La seccion es obligatoria').not().isEmpty(),
    check('ciudad','La ciudad es obligatoria').not().isEmpty(),
    check('intencionvoto','La intencion de voto es obligatoria').not().isEmpty(),
    check('latitud','La latitud es obligatoria').not().isEmpty(),
    check('longitud','La longitud es obligatoria').not().isEmpty(),
    check('responsable','El responsable es obligatorio').not().isEmpty(),
    validarCampos
], crearForm);

router.get('/getAll', allForm);

router.delete('/deleteUsuario', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], borrarUsuario);

// router.get('/all', allUser);


module.exports = router;