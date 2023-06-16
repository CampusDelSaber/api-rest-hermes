import User from '../../models/User.js';

export const sendAllUser = async (request, response) => {
	const users = await User.find();
	response.json(users);
};

export const sendUserById = async (request, response) => {
	const user = await User.findById(request.params.id);
	response.json(user);
};

export const sendUserByEmail = async (request, response) => {
	const user = await User.find({ email: request.params.email });
	response.json(user);
};
