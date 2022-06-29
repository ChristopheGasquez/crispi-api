import { Response } from '../models/response.model.js';
import CONST from '../constants/index.js';
import mongoose from 'mongoose';

export default (paramName = 'id') => {
  // Return middleware.
  return (req, res, next) => {
    // If header property exist.
    if (req.params[ paramName ] && mongoose.isValidObjectId(req.params[ paramName ])) {
      next();
    }
    else {
      // Create response with appropriated error.
      const response = new Response(CONST.response.error.ensure.param.objectId);
      response.meta = {
        field: paramName,
        reason: `Id sent on url param (named ${ paramName }) is not valid: bad format.`
      };
      // Send response.
      response.send(res);
    }
  };
}
