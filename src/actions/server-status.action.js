import CONST from '../constants/index.js';
import { Response } from '../models/response.model.js';

export default (req, res) => {
  const response = new Response(CONST.response.success.server.enable);

  response.send(res);
}
