/*
    path: api/dash
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { estadisticas, personasDash, filtroSeccion } = require('../controllers/dash');
const { validarCampos} = require('../middlewares/validar-campos');

const router = Router();

router.get('/estadisticas', estadisticas);
router.get('/personas', personasDash);
router.post('/filtroseccion', [
    check('seccion', 'La seccion no puede estar vacia').not().isEmpty().isLength({min: 4}),
    validarCampos
] , filtroSeccion);

module.exports = router;