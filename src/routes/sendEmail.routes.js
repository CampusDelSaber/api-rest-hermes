import { Router } from 'express';
import { sendEmail } from '../controller/requests/sendEmailReq.js';

const sendEmailRoute = Router();

// Define a route for sending emails
sendEmailRoute.post('/send-email', sendEmail);

export default sendEmailRoute;
