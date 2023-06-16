import { Router } from 'express';
import {
	sendAllUser,
	sendUserByEmail,
	sendUserById
} from '../controller/responses/userRes.js';
import {
	deleteUserById,
	editUserById,
	saveNewUser
} from '../controller/requests/userReq.js';

const userRouter = Router();

userRouter.get('/users', sendAllUser);

userRouter.get('/users/:id', sendUserById);

userRouter.get('/users/email/:email', sendUserByEmail);

userRouter.post('/users', saveNewUser);

userRouter.put('/users/:id', editUserById);

userRouter.delete('/users/:id', deleteUserById);

export default userRouter;
