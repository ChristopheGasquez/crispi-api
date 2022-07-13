import CONST from '../../constants/index.js';
import { Response } from '../../models/response.model.js';
import { Credential } from '../../schemas/credential.schema.js';
import utils from '../../utils/index.js';

export default async (req, res) => {
  // Get query params.
  const skip = req.query?.skip && parseInt(req.query.skip, 10) || 0;
  const limit = req.query?.limit && parseInt(req.query.limit, 10) || 100;
  // Get Credentials list and count.
  try {
    const [ { data, meta } ] = await Credential.aggregate([
      { $match: {} },
      { $sort: { level: 1 } },
      { $addFields: { id: '$_id' } },
      { $unset: [ '_id', 'password', '__v' ] },
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
    ]);
    // Create response.
    const response = new Response(CONST.response.success.credentials.list);
    // Set data.
    response.data = data;
    // Set meta.
    response.meta = meta;
    // Send response.
    return response.send(res);

  } catch {
    return utils.handlerError(res);
  }
}
