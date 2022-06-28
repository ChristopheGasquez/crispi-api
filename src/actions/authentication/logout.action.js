import { Response } from '../../models/response.model.js';
import CONST from '../../constants/index.js';

export default (req, res) => {
  // Create response.
  const response = new Response(CONST.response.success.authentication.logout);
  response.data = {
    accessToken: '',
    refreshToken: '',
    credential: {}
  };
  // Send response.
  response.send(res);
}
