import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface Payload {
    id: string;
}

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

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }

    try {
        const payload = jwt.verify(token, 'Esto-Es-Una-PalabR@_SecretA13455644') as Payload;
        global.userId = payload.id;
        next();
    } catch (error) {
        return res.status(403).json({ 
            message: "Token not valid" 
        });
    }
};