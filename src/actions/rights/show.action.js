import { Right } from '../../schemas/right.schema.js';
import { Response } from '../../models/response.model.js';
import CONST from '../../constants/index.js';
import utils from '../../utils/index.js';


export default (req, res) => {
  // Get Rights list
  Right
    .findById(req.params.id)
    .then((right) => {
      if (!right) {
        // Create response.
        const response = new Response(CONST.response.error.notFound);
        // Set meta.
        response.meta = {
          reason: 'Error: Right id does not exist.'
        }
        // Send response.
        response.send(res);
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
        response.send(res);
      }
    })
    .catch(utils.handlerError(res));
};
