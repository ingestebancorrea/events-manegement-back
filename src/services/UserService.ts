import { dbConnection } from "../databases/config";
import { QueryResult } from "pg";
import { User } from "../models/UserModel";

class UserService {
    async createUser(username: string, password: string, name: string): Promise<User> {
        try {
            const result = await dbConnection.query("INSERT INTO users VALUES(nextval('users_id_seq'), $1, $2, $3) RETURNING id", [username, password, name]);
            const userId = result.rows[0].id;
            
            return {
                id: userId, 
                username, 
                password, 
                name,
            };
        } catch (error) {
            console.log(error);
            throw new Error('Failed to create user.');
        }
    }

    async findByUsername(username: string): Promise<User | null> {
        try {
            const result = await dbConnection.query("SELECT * FROM users WHERE username = $1", [username]);
            
            if (result.rows.length === 0) {
                return null;
            }

            const userData = result.rows[0];
            const user: User = {
                id: userData.id,
                username: userData.username,
                password: userData.password,
                name: userData.name
            };
            
            return user;
        } catch (error) {
            console.log(error);
            throw new Error('Failed find a user.');
        }
    }
}

export default UserService;