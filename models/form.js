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
    colonia: {
        type: String,
        required: true,
    },
    seccion: {
        type: String,
        required: true,
    },
    ciudad: {
        type: String,
        required: true,
    },
    intencionvoto: {
        type: String,
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