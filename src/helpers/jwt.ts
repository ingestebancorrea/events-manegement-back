import jwt from 'jsonwebtoken';

export const generateJWT = (id: string | number, name: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const payload = { id, name };

        jwt.sign(payload, 'Esto-Es-Una-PalabR@_SecretA13455644', {
            expiresIn: '2h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se pudo generar el token');
            }

            resolve(token!);
        });
    });
};