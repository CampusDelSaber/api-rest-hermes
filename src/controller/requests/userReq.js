import User from '../../models/User.js';

export const saveNewUser = async (request, response) => {
	try {
		const newUser = new User(request.body);
		await newUser.save();
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};

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

export const deleteUserById = async (request, response) => {
	try {
		await User.findByIdAndDelete(request.params.id);
		response.sendStatus(200);
	} catch (error) {
		response.sendStatus(500);
	}
};
