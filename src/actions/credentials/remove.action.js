import { Credential } from '../../schemas/credential.schema.js';
import utils from '../../utils/index.js';
import { Response } from '../../models/response.model.js';
import CONST from '../../constants/index.js';

export default async (req, res) => {
  // Defined scope variables.
  let targetedCredential;
  // Get targeted right.
  try {
    targetedCredential = (await Credential.findById(req.params.id).exec());
  } catch (e) {
    return utils.handlerError(res);
  }
  // If targeted credential not found.
  if (!targetedCredential) {
    // Create response.
    const response = new Response(CONST.response.error.notFound);
    // Set data.
    response.mata = {
      field: 'id'
    };
    // Send response.
    response.send(res);
  }
  // If no error, remove right.
  else {
    try {
      await Credential.findByIdAndDelete(req.params.id);
      // Create response.
      const response = new Response(CONST.response.success.credentials.remove);
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
