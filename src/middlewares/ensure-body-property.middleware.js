import { Response } from '../models/response.model.js';
import CONST from '../constants/index.js';

export default (propertyName) => {
  // Return middleware.
  return (req, res, next) => {
    // If header property exist.
    if (req.body && req.body[propertyName]) {
      next();
    }
    else {
      // Create response with appropriated error.
      const response = new Response(CONST.response.error.ensure.body.property);
      response.meta = {
        field: `Missing '${ propertyName }' on body request.`
      }
      // Send response.
      response.send(res);
    }
  };
}
