import Incident from '../../models/Incident.js';
import { deleteDeathIncidents } from '../requests/incidentReq.js';

export const sendIncidentById = async (request, response) => {
	const incident = Incident.findById(request.params.id);
	response.json(incident);
};

export const sendIncidents = async (request, response) => {
	const { longitude, latitude, radius } = request.query;
	await deleteDeathIncidents();

	const incidents =
		longitude && latitude && radius
			? await getNearIncidents(longitude, latitude, radius)
			: await getAllIncidents();

	response.json(incidents);
};

const getAllIncidents = async () => {
	const incidents = await Incident.find();
	return incidents;
};

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
