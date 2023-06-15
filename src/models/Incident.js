import { Schema, model } from 'mongoose';

const IncidentSchema = new Schema(
	{
		type: {
			type: String,
			required: true
		},
		reason: {
			type: String
		},
		dateCreated: {
			type: Date,
			default: new Date()
		},
		deathDate: {
			type: Date,
			required: true
		},
		geometry: {
			type: Schema.Types.Mixed,
			required: true
		}
	},
	{
		versionKey: false
	}
);

export default model('Incident', IncidentSchema);
