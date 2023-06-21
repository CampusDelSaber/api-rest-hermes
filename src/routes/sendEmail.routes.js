import { Router } from 'express';
import { sendEmail } from '../controller/requests/sendEmailReq.js';

const sendEmailRoute = Router();

sendEmailRoute.post('/send-email', sendEmail);

export default sendEmailRoute;
