const homePage = {
	server: 'Hermes Backend Application'
};

export const sendHomePage = (request, response) => {
	response.json(homePage);
};

export const routeNotFound = (request, response, next) => {
	response.status(404).json({
		status: '404 route not found'
	});
};
