import { Right } from '../../schemas/right.schema.js';
import { Response } from '../../models/response.model.js';
import CONST from '../../constants/index.js';
import utils from '../../utils/index.js';


export default async (req, res) => {
  try {
    // Get Rights list
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
      // Create response.
      const response = new Response(CONST.response.success.rights.show);
      // Set data.
      response.data = right;
      // Set meta.
      response.meta = {
        query: {
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
