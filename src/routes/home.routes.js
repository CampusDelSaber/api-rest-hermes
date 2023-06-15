import { Router } from 'express';
import { sendHomePage } from '../controller/responses/indexRes.js';

const homeRouter = Router();

homeRouter.get('/', sendHomePage);

export default homeRouter;
