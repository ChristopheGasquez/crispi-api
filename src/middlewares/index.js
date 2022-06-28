import ensureAuthorization from './ensure-authorization.middleware.js';
import ensureBodyProperty from './ensure-body-property.middleware.js';
import ensureHeaderProperty from './ensure-header-property.middleware.js';

export default {
  ensureAuthorization,
  ensureBodyProperty,
  ensureHeaderProperty,
};
