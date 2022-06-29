import ensureAuthorization from './ensure-authorization.middleware.js';
import ensureBodyProperty from './ensure-body-property.middleware.js';
import ensureHeaderProperty from './ensure-header-property.middleware.js';
import ensureParamObjectId from './ensure-param-object-id.middleware.js';
import ensureRightLevel from './ensure-right-level.middleware.js';

export default {
  ensureAuthorization,
  ensureBodyProperty,
  ensureHeaderProperty,
  ensureParamObjectId,
  ensureRightLevel,
};
