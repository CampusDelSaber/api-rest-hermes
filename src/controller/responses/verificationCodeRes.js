import VerificationCode from '../../models/VerificationCode.js';

export const sendAllCodes = async (request, response) => {
	const codes = await VerificationCode.find();
	response.json(codes);
};

export const sendCodeById = (request, response) => {
	const code = findById(request.params.id);
	response.json(code);
};
