import { Right } from '../../schemas/right.schema.js';
import utils from '../../utils/index.js';
import { Credential } from '../../schemas/credential.schema.js';

export default async (req, res) => {
  // Defined scope variables.
  let issuerRight;
  let targetedRight;
  let isEmailAlreadyExists;
  // Get issuer right.
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

  return res.send({
    password: req.body.password,
    issuerRight,
    targetedRight,
    isEmailAlreadyExists
  });
}