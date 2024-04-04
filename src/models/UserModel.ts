export class User {
    id?: number;
    username: string;
    password: string;
    name: string;

    constructor(username: string, password: string, name: string, id?: number) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.name = name;
    }
}
