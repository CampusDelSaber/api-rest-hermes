import User from '../../models/User.js';

/**
 * Saves a new user.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const saveNewUser = async (request, response) => {
	try {
		const newUser = new User(request.body);
		await newUser.save();
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};

/**
 * Edits a user by its ID.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const editUserById = async (request, response) => {
	try {
		await User.findByIdAndUpdate(request.params.id, request.body, {
			new: true
		});
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};

/**
 * Deletes a user by its ID.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const deleteUserById = async (request, response) => {
	try {
		await User.findByIdAndDelete(request.params.id);
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};
