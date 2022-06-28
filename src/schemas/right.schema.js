import { schemaOptions } from '../utils/schema.config.js';
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    level: {
      type: 'number',
      required: true,
    },
    name: {
      type: 'string',
      required: true
    }
  },
  schemaOptions
);

export const Right = mongoose.model('Right', schema);
