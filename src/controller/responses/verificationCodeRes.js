import VerificationCode from '../../models/VerificationCode.js';

/**
 * Sends all verification codes as a JSON response.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const sendAllCodes = async (request, response) => {
	const codes = await VerificationCode.find();
	response.json(codes);
};

/**
 * Sends a verification code by its ID as a JSON response.
 * 
 * @param {*} request - The request object.
 * @param {*} response - The response object.
 */
export const sendCodeById = (request, response) => {
	const code = findById(request.params.id);
	response.json(code);
};
