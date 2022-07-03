import { Right } from '../../schemas/right.schema.js';
import { Credential } from '../../schemas/credential.schema.js';
import { Response } from '../../models/response.model.js';
import CONST from '../../constants/index.js';
import utils from '../../utils/index.js';

export default async (req, res) => {
  // Defined scope variables.
  let targetedLevel;
  let isInsufficientIssuerLevel;
  let isAlreadyUsedByCredential;
  // Get targeted right.
  try {
    targetedLevel = (await Right.findById(req.params.id).exec());
  } catch (e) {
    return utils.handlerError(res);
  }
  // Get issuer right level.
  try {
    const issuerLevel = (await Right.findById(req.issuer.right).exec()).level;
    isInsufficientIssuerLevel = targetedLevel?.level < issuerLevel;
  } catch (e) {
    return utils.handlerError(res);
  }
  // Get right with name sent in body request.
  try {
    isAlreadyUsedByCredential = Boolean((await Credential.find({ right: req.params.id }).exec()).length);
  } catch (e) {
    return utils.handlerError(res);
  }

  // If targeted right not found.
  if (!targetedLevel) {
    // Create response.
    const response = new Response(CONST.response.error.notFound);
    // Set data.
    response.mata = {
      field: 'id'
    };
    // Send response.
    return response.send(res);
  }
  // If insufficient issuer level.
  else if (isInsufficientIssuerLevel) {
    // Create response.
    const response = new Response(CONST.response.error.rights.insufficientIssuerLevel);
    // Set data.
    response.mata = {
      field: 'level'
    };
    // Send response.
    response.send(res);
  }
  // If error name already exists.
  else if (isAlreadyUsedByCredential) {
    // Create response.
    const response = new Response(CONST.response.error.rights.alreadyUsed);
    // Set data.
    response.mata = {
      field: 'id'
    };
    // Send response.
    return response.send(res);
  }
  // If no error, remove right.
  else {
    try {
      await Right.findByIdAndDelete(req.params.id);
      // Create response.
      const response = new Response(CONST.response.success.rights.remove);
      // Set meta.
      response.meta = {
        query: {
          id: req.params.id
        }
      };
      // Send response.
      return response.send(res);
    } catch {
      return utils.handlerError(res);
    }
  }
};
