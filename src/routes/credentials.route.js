import express from 'express';
import actions from '../actions/index.js';
import middleware from '../middlewares/index.js';

export default express
  // Define express router.
  .Router()
  // Global middleware for all credential routes
  .use(
    middleware.ensureAuthorization(),
    middleware.ensureRightLevel(0),
  )
  // Credentials GET => List.
  .get(
    '/',
    actions.credentials.list
  )
  // Credentials GET/:id => Show.
  .get(
    '/:id',
    middleware.ensureProperties([
      { from: 'params', key: 'id', required: true, format: 'id' }
    ]),
    actions.credentials.show
  )
  // Credentials PUT => Update.
  .put('/:id',
    middleware.ensureProperties([
      { from: 'params', key: 'id', required: true, format: 'id' },
      { from: 'body', key: 'email', required: true, format: 'email' },
      { from: 'body', key: 'password', required: true, format: 'password' },
      { from: 'body', key: 'right', required: true, format: 'id' },
    ]),
    middleware.encryptProperty('password'),
    actions.credentials.update
  )
  // Credentials DELETE/:id => Remove.
  .delete('/:id',
    middleware.ensureProperties([
      { from: 'params', key: 'id', required: true, format: 'id' }
    ]),
    actions.credentials.remove
  );
