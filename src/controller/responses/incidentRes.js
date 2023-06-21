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
	const { types, longitude, latitude, radius } = request.query;
	await deleteDeathIncidents();

	const incidents =
		longitude && latitude && radius
			? await getNearIncidents(types, longitude, latitude, radius)
			: await getAllIncidents(types);

	response.json(incidents);
};

/**
 * Retrieves all incidents.
 *
 * @returns {Array} - The array of incidents.
 */
const getAllIncidents = async (types) => {
	const incidents = types
		? await Incident.find({ type: getTypeQuery(types) })
		: await Incident.find();
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
const getNearIncidents = async (types, longitude, latitude, radius) => {
	try {
		const referenceCoordinate = [parseFloat(longitude), parseFloat(latitude)];
		const maxDistanceRadius = parseFloat(radius);
		const nearIncidentQuery = {
			$near: referenceCoordinate,
			$maxDistance: maxDistanceRadius
		};
		return types
			? await Incident.find({
					type: getTypeQuery(types),
					'geometry.coordinates': nearIncidentQuery
			  })
			: await Incident.find({
					'geometry.coordinates': nearIncidentQuery
			  });
	} catch (err) {
		return [];
	}
};

/**
 * This method build a query to find matches on a incident collection.
 * 
 * @param {*} types are a query parammeter types to find.
 * @returns type query to find.
 */
const getTypeQuery = (types) => {
	const typesArray = types.split(',');
	return { $in: typesArray };
};
