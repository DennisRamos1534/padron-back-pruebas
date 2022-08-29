const { response } = require('express');
// const bcrypt = require('bcryptjs');

const Formulario = require('../models/form');

const estadisticas = async (req, res = response) => {

    try {
        
        const total = await Formulario.countDocuments(); // para que realice la suma de los numeros
        const moci = await Formulario.countDocuments({intencionvoto: "Movimiento Ciudadano"});
        const porcentajeMoci = Math.round((moci * 100) / total);
        const morena = await Formulario.countDocuments({intencionvoto: "Morena"});
        const porcentajeMorena = Math.round((morena * 100) / total);
        const pri = await Formulario.countDocuments({intencionvoto: "Pri"});
        const porcentajePri = Math.round((pri * 100) / total);

        // TABLA POR COLONIA
        const centroMoci = await Formulario.countDocuments({colonia: "Centro", intencionvoto: "Movimiento Ciudadano"});
        const centroMorena = await Formulario.countDocuments({colonia: "Centro", intencionvoto: "Morena"});
        const centroPri = await Formulario.countDocuments({colonia: "Centro", intencionvoto: "Pri"});
        
        const guadalupeMoci = await Formulario.countDocuments({colonia: "Guadalupe", intencionvoto: "Movimiento Ciudadano"});
        const guadalupeMorena = await Formulario.countDocuments({colonia: "Guadalupe", intencionvoto: "Morena"});
        const guadalupePri = await Formulario.countDocuments({colonia: "Guadalupe", intencionvoto: "Pri"});
        
        const tiziminMoci = await Formulario.countDocuments({colonia: "Tizimin", intencionvoto: "Movimiento Ciudadano"});
        const tiziminMorena = await Formulario.countDocuments({colonia: "Tizimin", intencionvoto: "Morena"});
        const tiziminPri = await Formulario.countDocuments({colonia: "Tizimin", intencionvoto: "Pri"});
        
        const hornosMoci = await Formulario.countDocuments({colonia: "Hornos", intencionvoto: "Movimiento Ciudadano"});
        const hornosMorena = await Formulario.countDocuments({colonia: "Hornos", intencionvoto: "Morena"});
        const hornosPri = await Formulario.countDocuments({colonia: "Hornos", intencionvoto: "Pri"});
        
        const seybaplaya = await Formulario.countDocuments({ciudad: "Seybaplaya"});
        const xkeulil = await Formulario.countDocuments({ciudad: "Xkeulil"});
        const villamadero = await Formulario.countDocuments({ciudad: "Villamadero"});

        res.json({ 
            ok: true,
            total,
            moci,
            porcentajeMoci,
            morena,
            porcentajeMorena,
            pri,
            porcentajePri,
            centroMoci,
            centroMorena,
            centroPri,
            guadalupeMoci,
            guadalupeMorena,
            guadalupePri,
            tiziminMoci,
            tiziminMorena,
            tiziminPri,
            hornosMoci,
            hornosMorena,
            hornosPri,
            seybaplaya,
            xkeulil,
            villamadero
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const personasDash = async (req, res = response) => {
    try {
        const personasForm = await Formulario.find(); // para que realice la suma de los numeros
        personasForm.reverse();
        
        res.json({ 
            ok: true,
            personas: personasForm
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const filtroSeccion = async (req, res = response) => {

    const {seccion} = req.body;

    try {
        const personasFiltro = await Formulario.find({seccion: seccion}); // para que realice la suma de los numeros
        personasFiltro.reverse();
        
        res.json({ 
            ok: true,
            personas: personasFiltro
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
    estadisticas,
    personasDash,
    filtroSeccion
}