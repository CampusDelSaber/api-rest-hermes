import { connectToDatabase } from '../database/connection.js';
import serverApp from './settings.js';

export const startServer = async () => {
	const port = serverApp.get('port');

	if (port) {
		connectToDatabase();
		serverApp.listen(port, () => {
			console.log(`server on port ${port}`);
		});
	}
};
