import Incident from '../../models/Incident.js';

export const saveNewIncident = async (request, response) => {
	const incident = new Incident(request.body);
	try {
		await incident.save();
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};

export const editIncidentById = async (request, response) => {
	try {
		await Incident.findByIdAndUpdate(request.params.id, request.body, {
			new: true
		});
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};

export const deleteIncidentById = async (request, response) => {
	try {
		await Incident.findByIdAndDelete(request.params.id);
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};

export const deleteDeathIncidents = async () => {
	const currentDate = new Date();
	await Incident.deleteMany({
		deathDate: { $lt: currentDate }
	});
};
