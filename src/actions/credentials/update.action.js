import { Credential } from '../../schemas/credential.schema.js';
import { Right } from '../../schemas/right.schema.js';
import utils from '../../utils/index.js';

export default async (req, res) => {
  // Defined scope variables.
  let issuerRight;
  let targetedRight;
  let isEmailAlreadyExists;
  // Get issuer right. // Todo: Limit DB call at one with aggregate ($facet).
  try {
    issuerRight = await Right.findById(req.issuer.right);
  } catch {
    return utils.handlerError(res);
  }
  // Get target right
  try {
    targetedRight = await Right.findById(req.body.right);
  } catch {
    return utils.handlerError(res);
  }
  // Get is email already exist.
  try {
    isEmailAlreadyExists = Boolean((await Credential.find({
      email: req.body.email,
      _id: { $ne: req.params.id }
    })).length);
  } catch {
    return utils.handlerError(res);
  }
  // Todo: Implement update action.

  return res.send({
    password: req.body.password,
    issuerRight,
    targetedRight,
    isEmailAlreadyExists
  });
}
