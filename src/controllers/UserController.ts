import { Request, Response } from "express";
import { dbConnection } from "../databases/config";
import { QueryResult } from "pg";

export const createUser = async ( req: Request, res: Response ) => {
    try{
        const { username, password, name } = req.body;
        const response:QueryResult = await dbConnection.query('INSERT INTO users VALUES(null,$1,$2,$3)',[username,password,name]);
        res.json({
            message: 'User created successfully.',
            user: {
                username,
                password,
            }
        });
    }catch(error){
        console.log(error);
        return res.status(500).json('Internal Server Error.')
    }
}

export const login = ( req: Request, res: Response ) => {

}
