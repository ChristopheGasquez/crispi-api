import { Response } from '../models/response.model.js';
import CONST from '../constants/index.js';
import jwt from '../utils/json-web-token.js';

export default (req, res, next) => {
  const token = req.headers?.authorization;
  // If header property exist.
  if (token) {
    const issuer = jwt.decodeToken(token.split(' ')[ 1 ]);
    //   If token valid
    if (issuer) {
      // TODO: ensure:
      //   - token not expired
      //   If OK: set info contained on token in req.issuer property
      req.issuer = issuer;
      next();
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
    // Send response.
    response.send(res);
  }
};
