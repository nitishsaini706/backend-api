const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;
const swaggerDocument = YAML.load('./swagger.yaml');

// Middleware for parsing JSON and handling form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
(async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Routes
    app.use('/', routes);

    // Swagger API documentation setup
    if (swaggerDocument) {
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    } else {
      console.error('Swagger document not loaded. Check YAML file path.');
    }

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: err.message });
    });

    // Start server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit with failure status
  }
})();
