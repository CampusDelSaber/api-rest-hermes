import Incident from '../../models/Incident.js';
import { deleteDeathIncidents } from '../requests/incidentReq.js';

/**
 * Sends an incident by its ID as a JSON response.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const sendIncidentById = async (request, response) => {
	const incident = Incident.findById(request.params.id);
	response.json(incident);
};

/**
 * Sends a list of incidents as a JSON response.
 * 
 * If longitude, latitude, and radius are provided in the query parameters,
 * it retrieves nearby incidents; otherwise, it retrieves all incidents.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const sendIncidents = async (request, response) => {
	const { longitude, latitude, radius } = request.query;
	await deleteDeathIncidents();

	const incidents =
		longitude && latitude && radius
			? await getNearIncidents(longitude, latitude, radius)
			: await getAllIncidents();

	response.json(incidents);
};

/**
 * Retrieves all incidents.
 * 
 * @returns {Array} - The array of incidents.
 */
const getAllIncidents = async () => {
	const incidents = await Incident.find();
	return incidents;
};

/**
 * Retrieves nearby incidents based on the provided longitude, latitude, and radius.
 * 
 * @param {number} longitude - The longitude coordinate.
 * @param {number} latitude - The latitude coordinate.
 * @param {number} radius - The radius in which to search for incidents.
 * @returns {Array} - The array of nearby incidents.
 */
const getNearIncidents = async (longitude, latitude, radius) => {
	try {
		const referenceCoordinate = [parseFloat(longitude), parseFloat(latitude)];
		const maxDistanceRadius = parseFloat(radius);
		return await Incident.find({
			'geometry.coordinates': {
				$near: referenceCoordinate,
				$maxDistance: maxDistanceRadius
			}
		});
	} catch (err) {
		return [];
	}
};
