/**
 * Middleware Loader module
 */
const glob = require('glob');
const path = require('path');

const middlewareFiles = glob.sync(path.join(__dirname, '/*/*.js'));

exports.defineMiddleware = (app) => {
  middlewareFiles.forEach((middleware) => {
    require(middleware)(app); // eslint-disable-line
  });
};
