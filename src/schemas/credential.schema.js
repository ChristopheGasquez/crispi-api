import mongoose from 'mongoose';
import { schemaOptions } from '../utils/schema.config.js';

const schema = new mongoose.Schema({
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
      select: false
    },
    isEmailConfirmed: {
      type: 'boolean',
      default: false
    },
    right: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Right',
      required: true
    }
  },
  schemaOptions
);

export const Credential = mongoose.model('Credential', schema);
