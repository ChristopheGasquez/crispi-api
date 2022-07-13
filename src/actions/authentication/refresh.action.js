import CONST from '../../constants/index.js';
import { Response } from '../../models/response.model.js';
import { Credential } from '../../schemas/credential.schema.js';
import utils from '../../utils/index.js';
import jsonWebToken from '../../utils/json-web-token.js';

export default async (req, res) => {
  try {
    // Get credential by id.
    const credential = await Credential
      .findById(req.issuer.id)
      .select('-createdAt -updatedAt')
      .populate('right', '-createdAt -updatedAt');
    // If not found.
    if (!credential) {
      // Create response.
      const response = new Response(CONST.response.error.authentication.invalidToken);
      // Set meta.
      response.meta = {
        field: 'Authorization',
        reason: 'Error: Invalid refresh token, Can\'t find credential.'
      };
      // Send response.
      return response.send(res);
    }
    else {
      // Set token data according to the credential found.
      const tokenData = {
        id: credential.id,
        right: credential.right.id
      };
      // Create response.
      const response = new Response(CONST.response.success.authentication.refresh);
      // Set data.
      response.data = {
        accessToken: jsonWebToken.createToken(tokenData),
        refreshToken: jsonWebToken.createToken(tokenData, '60d'),
        credential,
      };
      // Send response.
      return response.send(res);
    }
  } catch {
    return utils.handlerError(res);
  }
}
