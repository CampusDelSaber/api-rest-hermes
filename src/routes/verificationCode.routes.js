import { Router } from 'express';
import {
	sendAllCodes,
	sendCodeById
} from '../controller/responses/verificationCodeRes.js';
import {
	deleteCodeById,
	editCodeById,
	saveNewCode
} from '../controller/requests/verificationCodeReq.js';

const codeRouter = Router();

codeRouter.get('/verificationCodes', sendAllCodes);

codeRouter.get('/verificationCodes/:id', sendCodeById);

codeRouter.post('/verificationCodes', saveNewCode);

codeRouter.put('/verificationCodes/:id', editCodeById);

codeRouter.delete('/verificationCodes/:id', deleteCodeById);

export default codeRouter;
