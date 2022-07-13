import CONST from '../constants/index.js';
import { Response } from '../models/response.model.js';
import jwt from '../utils/json-web-token.js';

export default () => {
  // Return middleware.
  return (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[ 1 ];
    // If header property exist.
    if (token) {
      const verify = jwt.verifyToken(token);
      //   If token valid
      if (verify?.issuer) {
        req.issuer = verify.issuer;
        next();
      }
      else if (verify?.error) {
        // Create response with appropriated error.
        const response = new Response(CONST.response.error.authentication[ verify.error.name ]);
        // Set meta on respons
        response.meta = {
          field: 'Authorization',
          reason: verify.error.message
        };
        // Send response.
        response.send(res);
      }
      else {
        // Create response with appropriated error.
        const response = new Response(CONST.response.error.authentication.invalidToken);
        // Send response.
        response.send(res);
      }
    }
    else {
      // Create response with appropriated error.
      const response = new Response(CONST.response.error.ensure.header.authorization);
      // Set meta on respons
      response.meta = {
        field: 'Authorization',
        reason: 'Missing Authorization field on header request.'
      };
      // Send response.
      response.send(res);
    }
  };
};
