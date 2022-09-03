const { response } = require('express');
// const bcrypt = require('bcryptjs');

const Formulario = require('../models/form');

const estadisticas = async (req, res = response) => {

    try {
        // por partido
        let total = 0;
        let moci = 0;
        let morena = 0;
        let pri = 0;

        // colonias
        let centroMoci = 0;
        let centroMorena = 0;
        let centroPri = 0;
        let guadalupeMoci = 0;
        let guadalupeMorena = 0;
        let guadalupePri = 0;
        let tiziminMoci = 0;
        let tiziminMorena = 0;
        let tiziminPri = 0;
        let hornosMoci = 0;
        let hornosMorena = 0;
        let hornosPri = 0;

        // Por ciudad
        let seybaplaya = 0;
        let xkeulil = 0;
        let villamadero = 0;

        const encuestas = await Formulario.find();
        encuestas.forEach(encuesta => {
            
            // Por Partido
            if(encuesta['intencionvoto'] == 'Movimiento Ciudadano') {
                moci++;
            }
            if(encuesta['intencionvoto'] == 'Morena') {
                morena++;
            }
            if(encuesta['intencionvoto'] == 'Pri') {
                pri++;
            }

            // Por Colonias
            if(encuesta['intencionvoto'] == 'Movimiento Ciudadano' && encuesta['colonia'] == 'Centro') {
                centroMoci++;
            }
            if(encuesta['intencionvoto'] == 'Morena' && encuesta['colonia'] == 'Centro') {
                centroMorena++;
            }
            if(encuesta['intencionvoto'] == 'Pri' && encuesta['colonia'] == 'Centro') {
                centroPri++;
            }
            if(encuesta['intencionvoto'] == 'Movimiento Ciudadano' && encuesta['colonia'] == 'Guadalupe') {
                guadalupeMoci++;
            }
            if(encuesta['intencionvoto'] == 'Morena' && encuesta['colonia'] == 'Guadalupe') {
                guadalupeMorena++;
            }
            if(encuesta['intencionvoto'] == 'Pri' && encuesta['colonia'] == 'Guadalupe') {
                guadalupePri++;
            }
            if(encuesta['intencionvoto'] == 'Movimiento Ciudadano' && encuesta['colonia'] == 'Tizimin') {
                tiziminMoci++;
            }
            if(encuesta['intencionvoto'] == 'Morena' && encuesta['colonia'] == 'Tizimin') {
                tiziminMorena++;
            }
            if(encuesta['intencionvoto'] == 'Pri' && encuesta['colonia'] == 'Tizimin') {
                tiziminPri++;
            }
            if(encuesta['intencionvoto'] == 'Movimiento Ciudadano' && encuesta['colonia'] == 'Hornos') {
                hornosMoci++;
            }
            if(encuesta['intencionvoto'] == 'Morena' && encuesta['colonia'] == 'Hornos') {
                hornosMorena++;
            }
            if(encuesta['intencionvoto'] == 'Pri' && encuesta['colonia'] == 'Hornos') {
                hornosPri++;
            }

            // Por ciudad
            if(encuesta['ciudad'] == 'Seybaplaya') {
                seybaplaya++;
            }
            if(encuesta['ciudad'] == 'Xkeulil') {
                xkeulil++;
            }
            if(encuesta['ciudad'] == 'Villamadero') {
                villamadero++;
            }

            total++;
        });

        const porcentajeMoci = Math.round((moci * 100) / total);
        const porcentajeMorena = Math.round((morena * 100) / total);
        const porcentajePri = Math.round((pri * 100) / total);
        
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