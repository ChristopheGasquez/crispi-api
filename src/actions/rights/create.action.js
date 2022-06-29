import { Right } from '../../schemas/right.schema.js';
import { Response } from '../../models/response.model.js';
import CONST from '../../constants/index.js';
import utils from '../../utils/index.js';


export default (req, res) => {
  // Todo: Ensure 'name' don't already exist.
  // Todo: Ensure 'level' is higher 'issuer.right.level
  // Create Right with body data.
  Right
    .create({
      name: req.body.name,
      level: req.body.level,
    })
    .then((right) => {
      // Create response.
      const response = new Response(CONST.response.success.rights.create);
      // Set data.
      response.data = right;
      // Send response.
      response.send(res);
    })
    .catch(utils.handlerError(res));
};
