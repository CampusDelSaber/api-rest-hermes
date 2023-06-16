import { Router } from 'express';
import {
	sendIncidentById,
	sendIncidents
} from '../controller/responses/incidentRes.js';
import {
	deleteIncidentById,
	editIncidentById,
	saveNewIncident
} from '../controller/requests/incidentReq.js';

const incidentRouter = Router();

incidentRouter.get('/incidents', sendIncidents);

incidentRouter.get('/incidents/:id', sendIncidentById);

incidentRouter.post('/incidents/', saveNewIncident);

incidentRouter.put('/incidents/:id', editIncidentById);

incidentRouter.delete('/incidents/:id', deleteIncidentById);

export default incidentRouter;
