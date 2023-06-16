import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: true
		},
		fullName: {
			type: String,
			required: true
		},
		userName: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true
		}
	},
	{
		versionKey: false
	}
);

export default model('User', UserSchema);
