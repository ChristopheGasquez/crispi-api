import { Right } from '../../schemas/right.schema.js';
import { Response } from '../../models/response.model.js';
import CONST from '../../constants/index.js';
import utils from '../../utils/index.js';

export default (req, res) => {
  // Get query params.
  const skip = req.query?.skip && parseInt(req.query.skip, 10) || 0;
  const limit = req.query?.limit && parseInt(req.query.limit, 10) || 100;
  // Get Rights list and count.
  Right
    .aggregate([
      { $match: {} },
      { $sort: { level: 1 } },
      { $addFields: { id: '$_id' } },
      { $unset: [ '_id', '__v' ] },
      {
        $facet: {
          meta: [
            { $count: 'count' },
            { $addFields: { skip, limit } }
          ],
          data: [
            { $skip: skip },
            { $limit: limit }, ]
        }
      }
    ])
    .then(([ { data, meta } ]) => {
      // Create response.
      const response = new Response(CONST.response.success.rights.list);
      // Set data.
      response.data = data;
      // Set meta.
      response.meta = meta;
      // Send response.
      response.send(res);
    })
    .catch(utils.handlerError(res));
};
