import { Request, Response } from "express";
import UserService from "../services/UserService";
import bcrypt from "bcryptjs";
import { User } from "../models/UserModel";
import { generateJWT } from "../helpers/jwt";

class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async createUser(req: Request, res: Response) {
        try {
            const { username, password, name } = req.body;

            const user = await this.userService.findByUsername(username);

            if (user) {
                return res.status(400).json({
                    msg: 'Ya existe un usuario registrado con el correo ingresado.'
                });
            }

            // Encrypt password
            const salt = bcrypt.genSaltSync();
            const hashedPassword = bcrypt.hashSync(password, salt);

            // Save user and retrieve the newly created user's id
            const newUser = await this.userService.createUser(username, hashedPassword, name);

            // Generate JWT
            const token = await generateJWT(newUser.id!, newUser.name);

            res.status(201).json({
                id: newUser.id,
                name: newUser.name,
                token
            });
        } catch (error) {
            console.log(error);
            res.status(500).json('Internal Server Error.');
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            const user = await this.userService.findByUsername(username);

            if (!user) {
                return res.status(400).json({
                    ok: false,
                    msg: 'No hay usuario registrado con el correo ingresado.'
                })
            }

            //Confirmar los passwords
            const validPassword = bcrypt.compareSync(password, user!.password);

            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Contraseña incorrecta.'
                })
            }

            //Generate JWT
            const token = await generateJWT(user.id!, user.name);

            res.status(201).json({
                id: user.id,
                name: user.name,
                token
            })
        } catch (error) {
            res.status(500).json({
                msg: 'Por favor hable con el administrador.'
            });
        }
    }
}

export default UserController;