const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {uid};
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn:  '1h' // 1 hora para desarrollo
            //expiresIn:  '7d' // 1 dia para produccion
        }, (err, token) => {

            if(err) {
                // No se pudo crear el token
                reject('No se pudo generar el JWT');
            } else {
                // TOKEN!
                resolve(token);
            }
        });
    });
}

const generarAdminJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const payload = {uid};
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '1h'
        }, (err, token) => {
            
            if(err) {
                // no se pudo crear el token
                reject('No se pudo general el JWT');
            } else {
                // TOKEN
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT,
    generarAdminJWT
}