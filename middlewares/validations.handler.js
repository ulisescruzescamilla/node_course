const boom = require('@hapi/boom');

function validationHandler(schema, property) {
  // schema
  // property
  return (req, res, next) => {
    const data = req[property];
    // req.body // get
    // req.params // post
    // req.query
    const {error} = schema.validate(data, {abortEarly: false});

    if (error) {
      next(boom.badRequest(error));
    }
    next();
  }
}

module.exports = validationHandler
