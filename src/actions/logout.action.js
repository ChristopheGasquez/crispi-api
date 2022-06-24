import { Response } from '../models/response.model.js';
import CONST from '../constants/index.js';

export default (req, res) => {
  // Create response.
  const response = new Response(CONST.response.success.authentication.logout);
  // Send response.
  response.send(res);
}
