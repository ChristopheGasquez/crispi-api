import express from 'express';
import actions from '../actions/index.js';

export default express
  // Defined express router
  .Router()
  // Home GET => Server status.
  .get(
    '/',
    actions.serverStatus
  );
