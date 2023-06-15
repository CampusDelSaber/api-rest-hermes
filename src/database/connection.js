import { set, connect } from 'mongoose';

set('strictQuery', true);
const MONGO_URI =
	'mongodb+srv://hermesmapapp:jzFAZXVdzEyCfHwh@hermes-cluster.qqt9zti.mongodb.net/hermesmapdb?retryWrites=true&w=majority';

export const connectToDatabase = async () => {
	await connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
		.then((db) => {
			console.log('database connected');
		})
		.catch((error) => {
			console.log('connection failed');
		});
};
