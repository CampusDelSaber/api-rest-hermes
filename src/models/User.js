import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true
		},
		
		userName: {
			type: String,
			required: true
		},
		pathImageUser: {
			type: String,
			required: true
		},
		typeUser: {
			type: String,
			required: true
		}
		
	},
	{
		versionKey: false
	}
);

export default model('User', UserSchema);
