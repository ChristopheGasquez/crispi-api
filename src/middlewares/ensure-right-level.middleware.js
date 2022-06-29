import { Response } from '../models/response.model.js';
import CONST from '../constants/index.js';
import { Right } from '../schemas/right.schema.js';

export default (level) => {
  // Return middleware.
  return (req, res, next) => {
    // If header property exist.
    if (req?.issuer?.right) {
      // Get issuer right.
      Right
        .findById(req.issuer.right)
        .then((right) => {
          // If issue have level unless level passed on parameter.
          if (right.level <= level) {
            next();
          }
          // If issue have level higher level passed on parameter.
          else {
            // Create response with appropriated error.
            const response = new Response(CONST.response.error.ensure.right.level);
            // Set meta.
            response.meta = {
              reason: `You do not have access to this resource: insufficient rights`,
            };
            // Send response.
            response.send(res);
          }
        })
        .catch(() => {
          // Create response.
          const response = new Response(CONST.response.error.notFound);
          // Set meta.
          response.meta = {
            field: 'Authorization',
            reason: 'Error: Right not found.'
          };
          // Send response.
          response.send(res);
        });
    }
    else {
      // Create response with appropriated error.
      const response = new Response(CONST.response.error.ensure.right.level);
      response.meta = {
        reason: `You do not have access to this resource.`,
      };
      // Send response.
      response.send(res);
    }
  };
}
