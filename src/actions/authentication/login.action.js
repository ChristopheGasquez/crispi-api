import { Response } from '../../models/response.model.js';
import CONST from '../../constants/index.js';
import { Credential } from '../../schemas/credential.schema.js';

export default (req, res) => {
  // Get credential by email and password,
  Credential.findOne({
    email: req.body.email,
    password: req.body.password
  })
    .select('-right')
    .then(credential => {
      // If null return error.
      if (!credential) {
        // Create response.
        const response = new Response(CONST.response.error.notFound);
        // Send response.
        response.send(res);
      }
      // If result, return accessToken ans credential.
      else {
        // Create response.
        const response = new Response(CONST.response.success.authentication.login);
        // Set data.
        response.data = {
          accessToken: `CrispiApiRest${ Date.now() }`,
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
      }
      // Send response.
      response.send(res);
    });
}
