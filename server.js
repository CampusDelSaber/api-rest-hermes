// import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initializing an instance of the Express application.
const app = express();

// Configuring the application to use the bodyParser middleware to parse JSON data sent in the request body.
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://hermesmapapp:jzFAZXVdzEyCfHwh@hermes-cluster.qqt9zti.mongodb.net/hermesmapdb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

const collectionName = "incidents";

// Implementing the CRUD operations for the "/incidents" route.

// Retrieve all incidents
app.get('/incidents', (req, res) => {
  Incident.find({})
    .then((incidents) => {
      res.json(incidents);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Create a new incident
app.post('/incidents', (req, res) => {
  const incident = new Incident(req.body);
  incident.save()
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

// Retrieve incidents within a certain radius
app.get('/incidents', (req, res) => {
  const { latitude, longitude, radius } = req.query;

  // Validate query parameters
  if (!latitude || !longitude || !radius) {
    return res.status(400).json({ error: 'Latitude, longitude, and radius are required query parameters.' });
  }

  const centerPoint = {
    type: 'Point',
    coordinates: [parseFloat(longitude), parseFloat(latitude)],
  };

  // Converting the radius from kilometers to meters.
  const radiusInMeters = parseFloat(radius) * 1000;

  const currentDate = new Date();

  // Using the $near operator to find incidents that are within a certain radius from the provided coordinates.
  Incident.find({
    geometry: {
      $near: {
        $geometry: centerPoint,
        $maxDistance: radiusInMeters,
      },
    },
    $expr: {
      $gt: [{ $toDate: '$deathDate' }, currentDate]
    }
  })
    .exec((err, incidents) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json(incidents);
      }
    });
});


// Starting the Express server on port 3004.
app.listen(3004, () => {
  console.log('Server started on port 3004');
});
