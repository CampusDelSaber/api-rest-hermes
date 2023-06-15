// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initializing an instance of the Express application.
const app = express();

// Configuring the application to use the bodyParser middleware to parse JSON data sent in the request body.
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
	.connect(
		'mongodb+srv://hermesmapapp:jzFAZXVdzEyCfHwh@hermes-cluster.qqt9zti.mongodb.net/hermesmapdb?retryWrites=true&w=majority',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	)
	.then((db) => {
		console.log('database connected');
	})
	.catch((error) => {
		console.log(error);
	});

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to Hermes API' });
});

// Creating a route handler for the root URL ("/") that sends a JSON response.
const incidentSchema = new mongoose.Schema({
	type: String,
	reason: String,
	dateCreated: Date,
	deathDate: Date,
	geometry: mongoose.Schema.Types.Mixed
});

// Creating a model based on the incidentSchema to perform CRUD operations on the incidents collection.
const Incident = mongoose.model('Incident', incidentSchema);

const collectionName = 'incidents';

// Implementing the CRUD operations for the "/incidents" route.
app.get('/incidents', async (request, response) => {
	let incidents = [];
	const { longitude, latitude, radius } = request.query;

	if (longitude && latitude && radius) {
		const referenceCoordinate = [parseFloat(longitude), parseFloat(latitude)];
		const maxDistanceRadius = parseFloat(radius);
		incidents = await Incident.find({
			'geometry.coordinates': {
				$near: referenceCoordinate,
				$maxDistance: maxDistanceRadius
			}
		});
	} else {
		incidents = await Incident.find();
	}

	response.json(incidents);
});

// Create a new incident
app.post('/incidents', (req, res) => {
	const incident = new Incident(req.body);
	incident
		.save()
		.then((savedIncident) => {
			res.json(savedIncident);
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

// Retrieve a specific incident by ID
app.get('/incidents/:id', (req, res) => {
	Incident.findById(req.params.id)
		.then((incident) => {
			if (incident) {
				res.json(incident);
			} else {
				res.status(404).json({ error: 'Incident not found' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

// Update a specific incident by ID
app.put('/incidents/:id', (req, res) => {
	Incident.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((incident) => {
			res.json(incident);
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

// Delete a specific incident by ID
app.delete('/incidents/:id', (req, res) => {
	Incident.findByIdAndDelete(req.params.id)
		.then(() => {
			res.json({ message: 'Incident deleted' });
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

// Route by Verification codes
const verificationCodesSchema = new mongoose.Schema({
	email: String,
	verificationCode: String,
	deathDate: Date
});

//Model of VerificationCodesSchema
const VerificationCodes = mongoose.model(
	'VerificationCodes',
	verificationCodesSchema
);

// Get all data from VerificationCodes collection
app.get('/VerificationCodes', (req, res) => {
	VerificationCodes.find({})
		.then((verificationCodes) => {
			res.json(verificationCodes);
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

// Save data in VerificationCodes collection
app.post('/VerificationCodes', (req, res) => {
	const verificationCodes = new VerificationCodes(req.body);
	verificationCodes
		.save()
		.then((savedVerificationCode) => {
			res.json(savedVerificationCode);
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

// Find a specific data in VerificationCodes collection
app.get('/VerificationCodes/:id', (req, res) => {
	VerificationCodes.findById(req.params.id)
		.then((verificationCode) => {
			if (verificationCode) {
				res.json(verificationCode);
			} else {
				res.status(404).json({ error: 'Verification code not found' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

// Update a specific data in VerificationCodes collection
app.put('/VerificationCodes/:id', (req, res) => {
	VerificationCodes.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then((verificationCode) => {
			res.json(verificationCode);
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

// Delete a specific data in VerificationCodes collection
app.delete('/VerificationCodes/:id', (req, res) => {
	VerificationCodes.findByIdAndDelete(req.params.id)
		.then(() => {
			res.json({ message: 'Verification code deleted ' });
		})
		.catch((err) => {
			res.status(500).json({ error: err });
		});
});

// Starting the Express server on port 3006.
app.listen(3006, () => {
	console.log('server on port 3006');
});
