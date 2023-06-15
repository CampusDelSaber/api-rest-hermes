import { Schema, model } from 'mongoose';

const VerificationCodeSchema = new Schema(
	{
		email: String,
		verificationCode: String,
		deathDate: Date
	},
	{
		versionKey: false
	}
);

//Model of VerificationCodesSchema
export default model('VerificationCode', VerificationCodeSchema);
