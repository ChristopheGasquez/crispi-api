import { Response } from '../models/response.model.js';
import CONST from '../constants/index.js';

export default (res/*, error*/) => {
  // Create response.
  const response = new Response(CONST.response.error.server.unknown);
  response.meta = {
    reason: 'Unknown'/*error?.message || 'Unknown'*/
  };
  // Send response.
  return response.send(res);
};
