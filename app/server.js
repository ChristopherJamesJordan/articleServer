/**
 * Main entry point for the Article storage micro-service
 */
const express = require('express');
const cookieParser = require('cookie-parser');
const expressGeoIP = require('express-geoip');
const bodyParser = require('body-parser');
const { defineMiddleware } = require('./middleware/index');

const app = express();

/* eslint-disable global-require */
// Middleware with latest Express format
app.use(express.static('public'));
app.use(expressGeoIP('US').getCountryCodeMiddleware);
app.use(cookieParser());
app.use(bodyParser.json());

// If RUN_CMD is 'MIGRATE_SCHEMA' run worker to migrate the database schema
if (process.env.RUN_CMD === 'MIGRATE_DB_SCHEMA') {
  const { defineModels } = require('./models/index');

  defineModels(false)
    .then((models) => {
      console.log('Model schema updated for Articles service', models);
      process.exit();
    })
    .catch((error) => {
      console.log('Error running schema migration', error);
      process.exit();
    });
}

// If no RUN_CMD or 'ARTICLES_SERVER' run the article server
if (!process.env.RUN_CMD || process.env.RUN_CMD === 'ARTICLES_SERVER') {
  // Define article model
  const { getModels } = require('./models/index');
  app.models = getModels();

  // Initialize all custom middleware
  defineMiddleware(app);

  // Set the application START_TIME
  app.START_TIME = +new Date();
  /* eslint-enable global-require */

  app.listen(process.env.SERVICE_PORT, () => {
    console.log(`Article Microservice listening on port ${process.env.SERVICE_PORT}`);
  });
}

module.exports = app;
