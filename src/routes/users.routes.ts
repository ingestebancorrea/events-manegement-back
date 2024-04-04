import { Router } from 'express';
import UserController from '../controllers/UserController';

class UserRoutes {
    public router: Router;
    private userController: UserController;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/register/users', this.userController.createUser.bind(this.userController));
        this.router.post('/login', this.userController.login.bind(this.userController));
    }

    getRouter() {
        return this.router;
    }
}

export default UserRoutes;