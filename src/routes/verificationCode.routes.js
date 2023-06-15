import { Router } from 'express';
import { sendAllCodes } from '../controller/responses/verificationCodeRes.js';
import {
	deleteCodeById,
	editCodeById,
	saveNewCode
} from '../controller/requests/verificationCodeReq.js';

const codeRouter = Router();

codeRouter.get('/codes', sendAllCodes);

codeRouter.get('/verificationCodes', sendAllCodes);

codeRouter.post('/verificationCodes', saveNewCode);

codeRouter.put('/verificationCodes/:id', editCodeById);

codeRouter.delete('/verificationCodes/:id', deleteCodeById);

export default codeRouter;
