import { Response } from '../models/response.model.js';
import CONST from '../constants/index.js';

export default (res) => {
  return (err) => {
    // Create response.
    const response = new Response(CONST.response.error.server.unknown);
    response.meta = {
      reason: /*err?.message || */'Unknown'
    };
    // Send response.
    response.send(res);
  };
};
