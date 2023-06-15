import Incident from '../../models/Incident.js';

/**
 * Saves a new incident.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const saveNewIncident = async (request, response) => {
	const incident = new Incident(request.body);
	try {
		await incident.save();
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};

/**
 * Edits an incident by its ID.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
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

/**
 * Deletes an incident by its ID.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const deleteIncidentById = async (request, response) => {
	try {
		await Incident.findByIdAndDelete(request.params.id);
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};

/**
 * Deletes incidents with death dates earlier than the current date.
 */
export const deleteDeathIncidents = async () => {
	const currentDate = new Date();
	await Incident.deleteMany({
		deathDate: { $lt: currentDate }
	});
};
