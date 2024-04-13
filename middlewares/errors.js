const InvalidError = (message) => ({ statusCode: 400, message });

const NotAuthorization = (message) => ({ statusCode: 401, message });

const NotFoundError = (message) => ({ statusCode: 404, message });

const ServerError = (message) => ({ statusCode: 500, message });

module.exports = {
  NotFoundError,
  InvalidError,
  NotAuthorization,
  ServerError,
};
