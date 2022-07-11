import mongoose from 'mongoose';
import CONST from '../constants/index.js';
import { Response } from '../models/response.model.js';

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
          ensureFormatPassword(errors, key, value, from)
          break;
        }
        case 'email': {
          ensureFormatPrimitive('string', errors, key, value, from);
          ensureFormatMinLength(6, errors, key, value, from);
          ensureFormatMaxLength(256, errors, key, value, from);
          ensureFormatEmail(errors, key, value, from);
          break;
        }
        default: {
          break;
        }
      }
    }

    if (errors?.length) {
      const response = new Response(CONST.response.error.ensure.properties);
      response.meta = errors;
      return response.send(res);
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
      if (value !== undefined && !mongoose.isValidObjectId(`${ value }`)) {
        errors.push({
          field: key,
          error: 'format',
          reason: `Property '${ key } from '${ from }' request have not the good format. Expected format: 'ID'.`
        });
      }
    }

    // Ensure format email.
    function ensureFormatEmail(errors, key, value, from) {
      if (value !== undefined && !value.toLowerCase().match(CONST.regex.emailRegex)) {
        errors.push({
          field: key,
          error: 'format',
          reason: `Property '${ key } from '${ from }' request have not the good format. Expected format: 'email'.`
        });
      }
    }

    // Ensure format password.
    function ensureFormatPassword(errors, key, value, from) {
      if (value !== undefined && !value.match(CONST.regex.passwordRegex)) {
        errors.push({
          field: key,
          error: 'format',
          reason: `Property '${ key } from '${ from }' request have not the good format. Expected format: 'password' (between 8 to 32 characters which contain at least one numeric digit, one uppercase and one lowercase letter).`
        });
      }
    }

    // Expected min length.
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
