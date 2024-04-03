import { Router } from 'express';
import { createUser, login } from '../controllers/UserController';

const userRouter = Router();

userRouter.post('/users',createUser);

userRouter.post('/auth/login',login);

export default userRouter;