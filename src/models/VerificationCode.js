import { Schema, model } from 'mongoose';

const VerificationCodeSchema = new Schema(
	{
		email: {
			type: String,
			required: true
		},
		verificationCode: {
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

//Model of VerificationCodesSchema
export default model('VerificationCode', VerificationCodeSchema);
