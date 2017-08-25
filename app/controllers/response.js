/**
 * Endpoint Response Controller module
 */

/**
 * Send sucess response with data
 * @param {Response} res
 * @param {Object} data
 * @param {Integer} code - Defaults to 200
 * @returns {Promise}
 * */
const sendSuccess = (res, data, code = 200) => res.status(code).send(data);

/**
 * Send error response with data
 * @param {Response} res
 * @param {Object} data
 * @param {Integer} code - Defaults to 200
 * @returns {Promise}
 * */
const sendError = (res, msg, code = 404) => res.status(code).send({ message: msg });

module.exports = {
  sendSuccess,
  sendError,
};
