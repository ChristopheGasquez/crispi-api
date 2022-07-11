import { Right } from '../../schemas/right.schema.js';
import utils from '../../utils/index.js';
import { Response } from '../../models/response.model.js';
import CONST from '../../constants/index.js';

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
    isAlreadyExists = Boolean((await Right.find({ name: req.body.name, _id: { $ne: req.params.id } })).length);
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
    return response.send(res);
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
    return response.send(res);
  }
  // If no error, create right.
  else {
    try {
      const right = await Right.findById(req.params.id);
      if (!right) {
        // Create response.
        const response = new Response(CONST.response.error.notFound);
        // Set meta.
        response.meta = {
          reason: 'Error: Right id does not exist.'
        };
        // Send response.
        return response.send(res);
      }
      else {
        const updatedRight = await Right.findByIdAndUpdate(
          req.params.id,
          { name: req.body.name, level: req.body.level },
          { new: true }
        );
        // Create response.
        const response = new Response(CONST.response.success.rights.update);
        // Set data.
        response.data = updatedRight;
        // Send response.
        return response.send(res);
      }
    } catch {
      return utils.handlerError(res);
    }
  }
}
