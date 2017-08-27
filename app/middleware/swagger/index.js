/**
 * Swagger Middleware module
 */
const swaggerTools = require('swagger-tools');
const yaml = require('yamljs');

const swaggerDoc = yaml.load('./api/swagger/swagger.yaml');
const validateResponse = false;

const options = {
  controllers: './routes',
};

module.exports = (app) => {
  swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
    app.use(middleware.swaggerMetadata());
    app.use(middleware.swaggerValidator({ validateResponse }));
    app.use(middleware.swaggerRouter(options));
    app.use(middleware.swaggerUi());
  });
};
