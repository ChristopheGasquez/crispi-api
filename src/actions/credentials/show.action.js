import { Response } from '../../models/response.model.js';
import CONST from '../../constants/index.js';
import utils from '../../utils/index.js';
import { Credential } from '../../schemas/credential.schema.js';

export default async (req, res) => {
  try {
    // Get Credentials list
    const credential = await Credential.findById(req.params.id);
    if (!credential) {
      // Create response.
      const response = new Response(CONST.response.error.notFound);
      // Set meta.
      response.meta = {
        reason: 'Error: Credential id does not exist.'
      };
      // Send response.
      return response.send(res);
    }
    else {
      // Create response.
      const response = new Response(CONST.response.success.credentials.show);
      // Set data.
      response.data = credential;
      // Set meta.
      response.meta = {
        params: {
          id: req.params.id
        }
      };
      // Send response.
      return response.send(res);
    }
  } catch {
    return utils.handlerError(res);
  }
};
