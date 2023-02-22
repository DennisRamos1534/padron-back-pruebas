const { response } = require('express');
// const bcrypt = require('bcryptjs');

const Formulario = require('../models/form');

const estadisticas = async (req, res = response) => {

    try {
        // por partido
        let total = 0;
        let beisbol = 0;
        let futbol = 0;
        let basquetbol = 0;

        // colonias
        let centroBeis = 0;
        let centroFut = 0;
        let centroBasquet = 0;
        let guadalupeBeis = 0;
        let guadalupeFut = 0;
        let guadalupeBasquet = 0;
        let tiziminBeis = 0;
        let tiziminFut = 0;
        let tiziminBasquet = 0;
        let hornosBeis = 0;
        let hornosFut = 0;
        let hornosBasquet = 0;

        // Por ciudad
        let seybaplaya = 0;
        let xkeulil = 0;
        let villamadero = 0;

        const encuestas = await Formulario.find();
        encuestas.forEach(encuesta => {
            
            // Por Partido
            if(encuesta['deporte'] == 'Beisbol') {
                beisbol++;
            }
            if(encuesta['deporte'] == 'Futbol') {
                futbol++;
            }
            if(encuesta['deporte'] == 'Basquetbol') {
                basquetbol++;
            }

            // Por Colonias
            if(encuesta['deporte'] == 'Beisbol' && encuesta['colonia'] == 'Centro') {
                centroBeis++;
            }
            if(encuesta['deporte'] == 'Futbol' && encuesta['colonia'] == 'Centro') {
                centroFut++;
            }
            if(encuesta['deporte'] == 'Basquetbol' && encuesta['colonia'] == 'Centro') {
                centroBasquet++;
            }
            if(encuesta['deporte'] == 'Beisbol' && encuesta['colonia'] == 'Guadalupe') {
                guadalupeBeis++;
            }
            if(encuesta['deporte'] == 'Futbol' && encuesta['colonia'] == 'Guadalupe') {
                guadalupeFut++;
            }
            if(encuesta['deporte'] == 'Basquetbol' && encuesta['colonia'] == 'Guadalupe') {
                guadalupeBasquet++;
            }
            if(encuesta['deporte'] == 'Beisbol' && encuesta['colonia'] == 'Tizimin') {
                tiziminMoci++;
            }
            if(encuesta['deporte'] == 'Futbol' && encuesta['colonia'] == 'Tizimin') {
                tiziminFut++;
            }
            if(encuesta['deporte'] == 'Basquetbol' && encuesta['colonia'] == 'Tizimin') {
                tiziminBasquet++;
            }
            if(encuesta['deporte'] == 'Beisbol' && encuesta['colonia'] == 'Hornos') {
                hornosBeis++;
            }
            if(encuesta['deporte'] == 'Futbol' && encuesta['colonia'] == 'Hornos') {
                hornosFut++;
            }
            if(encuesta['deporte'] == 'Basquetbol' && encuesta['colonia'] == 'Hornos') {
                hornosBasquet++;
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

        const porcentajeBeisbol = Math.round((beisbol * 100) / total);
        const porcentajeFutbol = Math.round((futbol * 100) / total);
        const porcentajeBasquetbol = Math.round((basquetbol * 100) / total);
        
        res.json({
            ok: true,
            total,
            beisbol,
            porcentajeBeisbol,
            futbol,
            porcentajeFutbol,
            basquetbol,
            porcentajeBasquetbol,
            centroBeis,
            centroFut,
            centroBasquet,
            guadalupeBeis,
            guadalupeFut,
            guadalupeBasquet,
            tiziminBeis,
            tiziminFut,
            tiziminBasquet,
            hornosBeis,
            hornosFut,
            hornosBasquet,
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