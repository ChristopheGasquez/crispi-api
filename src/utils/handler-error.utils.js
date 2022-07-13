import CONST from '../constants/index.js';
import { Response } from '../models/response.model.js';

export default (res/*, error*/) => {
  // Create response.
  const response = new Response(CONST.response.error.server.unknown);
  response.meta = {
    reason: 'Unknown'/*error?.message || 'Unknown'*/
  };
  // Send response.
  return response.send(res);
};
