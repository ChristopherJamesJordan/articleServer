const glob = require('glob');
const path = require('path');
const { postgresDB } = require('../config/components/postgres');

const modelFiles = glob.sync(path.join(__dirname, '/*/*.js'));

/**
 * Loads the model schemas from the model files
 * @returns {Object} models
 */
const getModels = () => {
  const models = {};

  modelFiles.forEach((model) => {
    const modelName = model.replace(/^.*models\/(.+)\/schema\.js$/, '$1');
    models[modelName] = require(model)(postgresDB, modelName); // eslint-disable-line
  });

  return models;
};

/**
 * Used to migrate the schema with sequelize
 * @param {Boolean} forceSync - defaults to False
 * @returns {Promise}
 */
const defineModels = (forceSync = false) => {
  const models = getModels();

  return new Promise((resolve, reject) => {
    postgresDB.sync({ forceSync })
      .then(() => resolve(models))
      .catch((err) => {
        console.log('Unable to sync models with error ', err);
        reject(err);
      });
  });
};

module.exports = {
  getModels,
  defineModels,
};
