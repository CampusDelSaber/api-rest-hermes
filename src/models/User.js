import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true
		},
		fullName: {
			type: String
		},
		userName: {
			type: String
		},
		isValid: {
			type: Boolean
		}
	},
	{
		versionKey: false
	}
);

export default model('User', UserSchema);
