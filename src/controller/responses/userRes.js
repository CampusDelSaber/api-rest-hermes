import User from '../../models/User.js';

/**
 * Sends all users as a JSON response.
 *
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const sendAllUser = async (request, response) => {
	const users = await User.find();
	response.json(users);
};

/**
 * Sends a user by its ID as a JSON response.
 *
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const sendUserById = async (request, response) => {
	const user = await User.findById(request.params.id);
	response.json(user);
};

/**
 * Sends a user by its email as a JSON response.
 *
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const sendUserByEmail = async (request, response) => {
	const user = await User.find({ email: request.params.email });
	response.json(user);
};