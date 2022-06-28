import { Response } from '../../models/response.model.js';
import CONST from '../../constants/index.js';
import { Credential } from '../../schemas/credential.schema.js';
import jsonWebToken from '../../utils/json-web-token.js';

export default (req, res) => {
  // Get credential by id.
  Credential
    .findById(req.issuer.id)
    .populate('right')
    .then(credential => {
      // If not found.
      if (!credential) {
        // Create response.
        const response = new Response(CONST.response.error.authentication.invalidToken);
        // Send response.
        response.send(res);
      }
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
        response.send(res);
      }
    })
    .catch((err) => {
      // Create response.
      const response = new Response(CONST.response.error.server.unknown);
      response.meta = {
        detail: err?.message || 'Unknown'
      };
      // Send response.
      response.send(res);
    });
}
