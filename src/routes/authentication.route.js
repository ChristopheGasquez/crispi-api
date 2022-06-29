import express from 'express';
import actions from '../actions/index.js';
import middleware from '../middlewares/index.js';

export default express
  // Defined express router
  .Router()
  // Home POST => Login.
  .post(
    '/',
    middleware.ensureBodyProperty('email'),
    middleware.ensureBodyProperty('password'),
    actions.authentication.login
  )
  // Home PUT => Refresh.
  .put(
    '/',
    middleware.ensureAuthorization(),
    middleware.ensureBodyProperty('refreshToken'),
    actions.authentication.refresh
  )
  // Home DELETE => Logout.
  .delete(
    '/',
    middleware.ensureAuthorization(),
    actions.authentication.logout
  );
