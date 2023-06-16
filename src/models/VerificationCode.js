import { Schema, model } from 'mongoose';

const VerificationCodeSchema = new Schema(
	{
		email: {
			type: String,
			required: true
		},
		verificationCode: {
			type: String,
			required: true
		},
		isValid: {
			type: Boolean,
			required: true
		}
	},
	{
		versionKey: false
	}
);

//Model of VerificationCodesSchema
export default model('VerificationCode', VerificationCodeSchema);
