import mongoose from 'mongoose';
import { schemaOptions } from '../constants/schema.constant.js';

const schema = new mongoose.Schema({
    level: {
      type: 'number',
      required: true,
    },
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    isDefault: {
      type: 'boolean',
      required: true,
      default: false,
      select: false
    }
  },
  schemaOptions
);

export const Right = mongoose.model('Right', schema);

