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
  /**
   * @api {get} /credentials List
   * @apiName GetCredentials
   * @apiGroup Credentials
   * @apiVersion 1.0.0
   *
   * @apiUse Authorization
   * @apiUse Permission0
   *
   * @apiQuery {Number} [limit=100] Number of documents to recover.
   * @apiQuery {Number} [skip=0]    Number of documents to skip.
   *
   * @apiSuccess (Success 200) {Number} status=200                           Response status.
   * @apiSuccess (Success 200) {String} code="success.credentials.list"      Response code.
   * @apiSuccess (Success 200) {String} message="Success: Credentials list." Response message.
   * @apiSuccess (Success 200) {Object} meta                                 Response metadata with query used to limit the response and the total number of documents matching the query.
   * @apiSuccess (Success 200) {Credential[]} data                           Credentials.
   *
   * @apiSuccessExample {json} Success-response
   *    {
   *        "code": "success.credentials.list",
   *        "data": [
   *            {
   *                "email": "user.1@email.com",
   *                "isEmailConfirmed": false,
   *                "createdAt": "2022-06-27T22:03:42.283Z",
   *                "updatedAt": "2022-06-27T22:03:42.283Z",
   *                "right": "62ba40b29f70d01b81356b53",
   *                "id": "62c1ad2e251cc4457ad1a696"
   *            }
   *        ],
   *        "message": "Success: Credentials list.",
   *        "meta": [
   *            {
   *                "count": 1,
   *                "skip": 0,
   *                "limit": 100
   *            }
   *        ],
   *        "status": 200
   *    }
   */
  .get(
    '/',
    middleware.ensureProperties([
      { from: 'query', key: 'limit', required: false, format: 'string' },
      { from: 'query', key: 'skip', required: false, format: 'string' }
    ]),
    actions.credentials.list
  )
  // Credentials GET/:id => Show.
  /**
   * @api {get} /credentials/:id Show
   * @apiName GetCredential
   * @apiGroup Credentials
   * @apiVersion 1.0.0
   *
   * @apiUse Authorization
   * @apiUse Permission0
   *
   * @apiParam {ObjectId} id Identifier of the targeted resource.
   *
   * @apiSuccess (Success 200) {Number} status=200                           Response status.
   * @apiSuccess (Success 200) {String} code="success.credentials.show"      Response code.
   * @apiSuccess (Success 200) {String} message="Success: Credentials show." Response message.
   * @apiSuccess (Success 200) {Object} meta                                 Response metadata with id sent as param.
   * @apiSuccess (Success 200) {Credential} data                             Credential targeted.
   *
   * @apiSuccessExample {json} Success-response
   *    {
   *        "code": "success.credentials.show",
   *        "data": {
   *            "email": "user.1@email.com",
   *            "isEmailConfirmed": false,
   *            "createdAt": "2022-06-27T22:03:42.283Z",
   *            "updatedAt": "2022-06-27T22:03:42.283Z",
   *            "right": "62ba40b29f70d01b81356b53",
   *            "id": "62c1ad2e251cc4457ad1a696"
   *        },
   *        "message": "Success: Credentials show.",
   *        "meta": {
   *            "params": {
   *                "id": "62c1ad2e251cc4457ad1a696"
   *            }
   *        },
   *        "status": 200
   *    }
   */
  .get(
    '/:id',
    middleware.ensureProperties([
      { from: 'params', key: 'id', required: true, format: 'id' }
    ]),
    actions.credentials.show
  )
  // Credentials PUT => Update.
  /**
   * @api {put} /credentials/:id Update
   * @apiName UpdateCredential
   * @apiGroup Credentials
   * @apiVersion 1.0.0
   *
   * @apiUse Authorization
   * @apiUse Permission0
   *
   * @apiParam {ObjectId} id Identifier of the targeted resource.
   *
   * @apiBody {String} email    Email of the credential to update.
   * @apiBody {String} password Password of the credential to update.
   * @apiBody {String} right  Right Id of the credential to update.
   *
   * @apiSuccessExample {json} Success-response
   *    {}
   *
   * Todo: Documentation
   */
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
  /**
   * @api {delete} /credentials/:id Delete
   * @apiName DeleteCredential
   * @apiGroup Credentials
   * @apiVersion 1.0.0
   *
   * @apiUse Authorization
   * @apiUse Permission0
   *
   * @apiParam {ObjectId} id Identifier of the targeted resource.
   *
   * @apiSuccess (Success 200) {Number} status=200                              Response status.
   * @apiSuccess (Success 200) {String} code="success.credentials.remove"       Response code.
   * @apiSuccess (Success 200) {String} message="Success: Credentials removed." Response message.
   * @apiSuccess (Success 200) {Object} meta                                    Response metadata with id sent as param.
   * @apiSuccess (Success 200) {Object} data                                    Empty object.
   *
   * @apiSuccessExample {json} Success-response
   *    {
   *        "code": "success.credentials.remove",
   *        "data": {},
   *        "message": "Success: Credentials removed.",
   *        "meta": {
   *            "params": {
   *                "id": "62ce8fbd1ec5ce9c8582c8dd"
   *            }
   *        },
   *        "status": 200
   *    }
   */
  .delete('/:id',
    middleware.ensureProperties([
      { from: 'params', key: 'id', required: true, format: 'id' }
    ]),
    actions.credentials.remove
  );
