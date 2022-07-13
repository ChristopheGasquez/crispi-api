import { Response } from '../../models/response.model.js';
import CONST from '../../constants/index.js';
import { Credential } from '../../schemas/credential.schema.js';
import jsonWebToken from '../../utils/json-web-token.js';
import utils from '../../utils/index.js';

export default async (req, res) => {
  try {
    const credential = await Credential
      .findOne({
        email: req.body.email,
        password: req.body.password
      })
      .select('-createdAt -updatedAt')
      .populate('right', '-createdAt -updatedAt');
    // If null return error.
    if (!credential) {
      // Create response.
      const response = new Response(CONST.response.error.notFound);
      // Set meta.
      response.meta = {
        reason: 'Error: Credential unknown.'
      };
      // Send response.
      return response.send(res);
    }
    // If result, return accessToken ans credential.
    else {
      // Set token data according to the credential found.
      const tokenData = {
        id: credential.id,
        right: credential.right.id
      };
      // Create response.
      const response = new Response(CONST.response.success.authentication.login);
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
