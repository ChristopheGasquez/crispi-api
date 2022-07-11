import { Right } from '../../schemas/right.schema.js';
import { Response } from '../../models/response.model.js';
import CONST from '../../constants/index.js';
import utils from '../../utils/index.js';

export default async (req, res) => {
  // Defined scope variables.
  let isInsufficientIssuerLevel;
  let isAlreadyExists;
  // Get issuer right level.
  try {
    isInsufficientIssuerLevel = Boolean((await Right.findById(req.issuer.right)).level > req.body.level);
  } catch {
    return utils.handlerError(res);
  }
  // Get right with name sent in body request.
  try {
    isAlreadyExists = Boolean((await Right.find({ name: req.body.name })).length);
  } catch {
    return utils.handlerError(res);
  }
  // If error: insufficient issuer level.
  if (isInsufficientIssuerLevel) {
    // Create response.
    const response = new Response(CONST.response.error.rights.insufficientIssuerLevel);
    // Set data.
    response.meta = {
      field: 'level'
    };
    // Send response.
    response.send(res);
  }
  // If error name already exists.
  else if (isAlreadyExists) {
    // Create response.
    const response = new Response(CONST.response.error.rights.alreadyExists);
    // Set data.
    response.meta = {
      field: 'name'
    };
    // Send response.
    response.send(res);
  }
  // If no error, create right.
  else {
    try {
      const right = await Right.create({ name: req.body.name, level: req.body.level });
      // Create response.
      const response = new Response(CONST.response.success.rights.create);
      // Set data.
      response.data = right;
      // Send response.
      return response.send(res);
    } catch {
      return utils.handlerError(res);
    }
  }
};
