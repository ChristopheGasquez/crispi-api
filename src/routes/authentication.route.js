import express from 'express';
import actions from '../actions/index.js';
import middleware from '../middlewares/index.js';

export default express
  // Defined express router
  .Router()
  // Home POST => Login.
  .post(
    '/',
    middleware.ensureProperties([
      { from: 'body', key: 'email', required: true, format: 'email' },
      { from: 'body', key: 'password', required: true, format: 'password' },
    ]),
    middleware.encryptProperty('password'),
    actions.authentication.login
  )
  // Home PUT => Refresh.
  .put(
    '/',
    middleware.ensureAuthorization(),
    middleware.ensureProperties([
      { from: 'body', key: 'refreshToken', required: true, format: 'string' },
    ]),
    actions.authentication.refresh
  )
  // Home DELETE => Logout.
  .delete(
    '/',
    middleware.ensureAuthorization(),
    actions.authentication.logout
  );
