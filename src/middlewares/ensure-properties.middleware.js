import mongoose from 'mongoose';

export default (rules = []) => {
  // rules: { from: 'body', key: 'password', format: 'string', required: true }[]
  // Return middleware.
  return async (req, res, next) => {
    const defaultPropertyForm = 'body';
    const defaultPropertyFormat = 'string';

    const errors = [];

    for (const rule of rules) {
      const key = rule.key;
      const from = rule.from || defaultPropertyForm;
      const isRequired = !!rule.required;
      const format = rule.format || defaultPropertyFormat;
      const value = req[ from ][ key ];

      // Ensure is required rule.
      ensureIsRequired(errors, isRequired, key, value, from);
      // Ensure format rule.
      switch (format) {
        case 'boolean': {
          ensureFormatPrimitive('boolean', errors, key, value, from);
          break;
        }
        case 'number': {
          ensureFormatPrimitive('number', errors, key, value, from);
          break;
        }
        case 'string': {
          ensureFormatPrimitive('string', errors, key, value, from);
          break;
        }
        case 'id': {
          ensureFormatObjectID(errors, key, value, from);
          break;
        }
        case 'password': {
          ensureFormatPrimitive('string', errors, key, value, from);
          ensureFormatMinLength(6, errors, key, value, from);
          ensureFormatMaxLength(32, errors, key, value, from);
          // Todo: Password regex.
          break;
        }
        case 'email': {
          ensureFormatPrimitive('string', errors, key, value, from);
          ensureFormatMinLength(6, errors, key, value, from);
          ensureFormatMaxLength(256, errors, key, value, from);
          // TODO: Email regex.
          break;
        }
        case 'token': {
          // TODO: Token.
          break;
        }
        default: {
          break;
        }
      }
    }

    if (errors?.length) {
      return res.send(errors);
    }
    else {
      next();
    }

    // Ensure is required.
    function ensureIsRequired(errors, isRequired, key, value, from) {
      if (isRequired && (value === null || value === undefined || value === '')) {
        errors.push({
          field: key,
          error: 'required',
          reason: `Property '${ key } is required and missing from '${ from } request.'`
        });
      }
    }

    // Ensure primitive.
    function ensureFormatPrimitive(primitive, errors, key, value, from) {
      if (typeof value !== primitive && value !== undefined) {
        errors.push({
          field: key,
          error: 'format',
          reason: `Property '${ key } from '${ from }' request have not the good format. Expected format: '${ primitive }'.`
        });
      }
    }

    // Ensure format objectID.
    function ensureFormatObjectID(errors, key, value, from) {
      //     if (req.params[ paramName ] && mongoose.isValidObjectId(req.params[ paramName ])) {
      if (value !== undefined && !mongoose.isValidObjectId(`${ value }`)) {
        errors.push({
          field: key,
          error: 'format',
          reason: `Property '${ key } from '${ from }' request have not the good format. Expected format: 'ID'.`
        });
      }
    }    // Expected min length.
    function ensureFormatMinLength(length, errors, key, value, from) {
      if (value !== undefined && value?.length < length) {
        errors.push({
          field: key,
          error: 'format',
          reason: `Property '${ key } from '${ from }' request have not the good length. Expected min length: '${ length }'.`
        });
      }
    }

    // Expected max length.
    function ensureFormatMaxLength(length, errors, key, value, from) {
      if (value !== undefined && value?.length > length) {
        errors.push({
          field: key,
          error: 'format',
          reason: `Property '${ key } from '${ from }' request have not the good length. Expected max length: '${ length }'.`
        });
      }
    }
  };
}
