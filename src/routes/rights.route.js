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
    middleware.ensureParamObjectId(),
    actions.rights.show
  )
  // Rights POST => Create.
  .post('/',
    middleware.ensureBodyProperty('name'),
    middleware.ensureBodyProperty('level'),
    actions.rights.create
  )
  // Rights DELETE/:id => Remove.
  .delete('/:id',
    middleware.ensureParamObjectId(),
    actions.rights.remove
  );
