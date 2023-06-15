import VerificationCode from '../../models/VerificationCode.js';

/**
 * Saves a new verification code.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const saveNewCode = async (request, response) => {
	const newCode = new VerificationCode(request.body);
	try {
		await newCode.save();
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};

/**
 * Edits a verification code by its ID.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const editCodeById = async (request, response) => {
	try {
		await VerificationCode.findByIdAndUpdate(request.params.id, request.body, {
			new: true
		});
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};

/**
 * Deletes a verification code by its ID.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const deleteCodeById = async (request, response) => {
	try {
		await VerificationCode.findByIdAndDelete(request.params.id);
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};
