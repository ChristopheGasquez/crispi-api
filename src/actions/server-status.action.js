import { Response } from '../models/response.model.js';
import CONST from '../constants/index.js';

export default (req, res) => {
  const response = new Response(CONST.response.success.server.enable);

  response.send(res);
}
