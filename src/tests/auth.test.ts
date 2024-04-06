import { Request, Response, NextFunction } from 'express';
import { generateJWT, verifyToken } from "../helpers/jwt";

describe('Funciones asociadas a la lógica de auth', () => {
    describe('generateJWT function', () => {
        test('Debe retornar un string', async () => {
            const result = await generateJWT(9, 'Ericsson');
            expect(typeof result).toBe('string');
        });

        test('Debe retornar un token', async () => {
            const result = await generateJWT(1, 'Esteban');
            expect(result).toBeTruthy();
        });
    });

    describe('verifyToken function', () => {
        let req: Partial<Request>;
        let res: Partial<Response>;
        let next: jest.Mock<NextFunction>;
    
        beforeEach(() => {
            req = {
                header: jest.fn(),
            };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            next = jest.fn();
        });
    
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        test('Deberia retornar 401 si el token no es proveido.', () => {
            req.header = jest.fn().mockReturnValue(undefined);
    
            verifyToken(req as Request, res as Response, next);
    
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ message: "Token not provided" });
            expect(next).not.toHaveBeenCalled();
        });
    
        test('Deberia retornar 403 si el token no es valido', () => {
            req.header = jest.fn().mockReturnValue("Bearer invalidToken");
    
            verifyToken(req as Request, res as Response, next);
    
            expect(res.status).toHaveBeenCalledWith(403);
            expect(res.json).toHaveBeenCalledWith({ message: "Token not valid" });
            expect(next).not.toHaveBeenCalled();
        });
    });
});
