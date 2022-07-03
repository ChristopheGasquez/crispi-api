import express from 'express';
import actions from '../actions/index.js';
import middleware from '../middlewares/index.js';

export default express
  // Define express router.
  .Router()
  // Global middleware for all rights routes
  .use(
    middleware.ensureAuthorization(),
    middleware.ensureRightLevel(0) // Only admin can access to this router.
  )
  // Rights GET => List.
  .get(
    '/',
    actions.rights.list
  )
  // Rights GET/:id => Show.
  .get(
    '/:id',
    middleware.ensureProperties([
      { from: 'params', key: 'id', required: true, format: 'id' }
    ]),
    actions.rights.show
  )
  // Rights POST => Create.
  .post('/',
    middleware.ensureProperties([
      { from: 'body', key: 'name', required: true, format: 'string' },
      { from: 'body', key: 'level', required: true, format: 'number' }
    ]),
    actions.rights.create
  )
  // Rights PUT => Update.
  .put('/:id',
    middleware.ensureProperties([
      { from: 'params', key: 'id', required: true, format: 'id' },
      { from: 'body', key: 'name', required: true, format: 'string' },
      { from: 'body', key: 'level', required: true, format: 'number' }
    ]),
    actions.rights.update
  )
  // Rights DELETE/:id => Remove.
  .delete('/:id',
    middleware.ensureProperties([
      { from: 'params', key: 'id', required: true, format: 'id' }
    ]),
    actions.rights.remove
  );
