const {Schema, model} = require('mongoose');

const FormularioSchema = Schema({

    nombre: {
        type: String,
        required: true,
    },
    edad: {
        type: String,
        required: true,
    },
    sexo: {
        type: String,
        required: true,
    },
    coloniaid: {
        type: Intl, // cambiamos al id
        required: true,
    },
    colonia: {
        type: String, // cambiamos al id
        required: true,
    },
    seccionid: {
        type: Intl,
        required: true,
    },
    seccion: {
        type: String,
        required: true,
    },
    ciudadid: {
        type: Intl,
        required: true,
    },
    ciudad: {
        type: String,
        required: true,
    },
    deporteid: {
        type: Intl, // cambiamos al id
        required: true,
    },
    deporte: {
        type: String, // cambiamos al id
        required: true,
    },
    latitud: {
        type: String,
        required: true,
    },
    longitud: {
        type: String,
        required: true,
    },
    responsable: {
        type: String,
        required: true,
    },
});

FormularioSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Formulario', FormularioSchema);