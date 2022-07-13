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
  /**
   * @api {get} /rights List
   * @apiName GetRights
   * @apiGroup Rights
   * @apiVersion 1.0.0
   *
   * @apiUse Authorization
   * @apiUse Permission0
   *
   * @apiQuery {Number} [limit=100] Number of documents to recover.
   * @apiQuery {Number} [skip=0]    Number of documents to skip.
   *
   * @apiSuccess (Success 200) {Number} status=200                      Response status.
   * @apiSuccess (Success 200) {String} code="success.rights.list"      Response code.
   * @apiSuccess (Success 200) {String} message="Success: Rights list." Response message.
   * @apiSuccess (Success 200) {Object} meta                            Response metadata with query used to limit the response and the total number of documents matching the query.
   * @apiSuccess (Success 200) {Right[]} data                           Rights.
   *
   * @apiSuccessExample {json} Success-response
   *    {
   *        "code": "success.rights.list",
   *        "data": [
   *            {
   *                "level": 0,
   *                "name": "Administrator",
   *                "createdAt": "2022-06-27T23:43:46.220Z",
   *                "updatedAt": "2022-06-27T23:43:46.220Z",
   *                "isDefault": false,
   *                "id": "62ba40b29f70d01b81356b53"
   *            }
   *         ],
   *        "message": "Success: Rights list.",
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
    actions.rights.list
  )
  // Rights GET/:id => Show.
  /**
   * @api {get} /rights/:id Show
   * @apiName GetRight
   * @apiGroup Rights
   * @apiVersion 1.0.0
   *
   * @apiUse Authorization
   * @apiUse Permission0
   *
   * @apiParam {ObjectId} id Identifier of the targeted resource.
   *
   * @apiSuccess (Success 200) {Number} status=200                      Response status.
   * @apiSuccess (Success 200) {String} code="success.rights.show"      Response code.
   * @apiSuccess (Success 200) {String} message="Success: Rights show." Response message.
   * @apiSuccess (Success 200) {Object} meta                            Response metadata with id sent as param.
   * @apiSuccess (Success 200) {Right} data                             Right targeted.
   *
   * @apiSuccessExample {json} Success-response
   *    {
   *        "code": "success.rights.show",
   *        "data": {
   *            "level": 0,
   *            "name": "Administrator",
   *            "createdAt": "2022-06-27T23:43:46.220Z",
   *            "updatedAt": "2022-06-27T23:43:46.220Z",
   *            "id": "62ba40b29f70d01b81356b53"
   *        },
   *        "message": "Success: Rights show.",
   *        "meta": {
   *            "params": {
   *                "id": "62ba40b29f70d01b81356b53"
   *            }
   *        },
   *        "status": 200
   *    }
   *
   */
  .get(
    '/:id',
    middleware.ensureProperties([
      { from: 'params', key: 'id', required: true, format: 'id' }
    ]),
    actions.rights.show
  )
  // Rights POST => Create.
  /**
   * @api {post} /rights Create
   * @apiName CreateRight
   * @apiGroup Rights
   * @apiVersion 1.0.0
   *
   * @apiUse Authorization
   * @apiUse Permission0
   *
   * @apiBody {String} name Name of the right to create.
   * @apiBody {Number} level Level of the right to create.
   *
   * @apiSuccess (Success 201) {Number} status=201                         Response status.
   * @apiSuccess (Success 201) {String} code="success.rights.create"       Response code.
   * @apiSuccess (Success 201) {String} message="Success: Rights created." Response message.
   * @apiSuccess (Success 201) {Object} meta                               Empty object.
   * @apiSuccess (Success 201) {Right}  data                               Right created.
   *
   * @apiSuccessExample {json} Success-response
   *    {
   *        "code": "success.rights.create",
   *        "data": {
   *            "level": 2000,
   *            "name": "User2000",
   *            "isDefault": false,
   *            "createdAt": "2022-07-11T22:16:45.193Z",
   *            "updatedAt": "2022-07-11T22:16:45.193Z",
   *            "id": "62cca14d05338c3413904c3f"
   *        },
   *        "message": "Success: Right created.",
   *        "meta": {},
   *        "status": 201
   *    }
   */
  .post('/',
    middleware.ensureProperties([
      { from: 'body', key: 'name', required: true, format: 'string' },
      { from: 'body', key: 'level', required: true, format: 'number' }
    ]),
    actions.rights.create
  )
  // Rights PUT => Update.
  /**
   * @api {put} /rights/:id Update
   * @apiName UpdateRight
   * @apiGroup Rights
   * @apiVersion 1.0.0
   *
   * @apiUse Authorization
   * @apiUse Permission0
   *
   * @apiParam {ObjectId} id Identifier of the targeted resource.
   *
   * @apiBody {String} name Name of the right to update.
   * @apiBody {Number} level Level of the right to update.
   *
   * @apiSuccess (Success 200) {Number} status=201                         Response status.
   * @apiSuccess (Success 200) {String} code="success.rights.update"       Response code.
   * @apiSuccess (Success 200) {String} message="Success: Rights updated." Response message.
   * @apiSuccess (Success 200) {Object} meta                               Empty object.
   * @apiSuccess (Success 200) {Right} data                                Right updated.
   *
   * @apiSuccessExample {json} Success-response
   *    {
   *        "code": "success.rights.update",
   *        "data": {
   *            "level": 9000,
   *            "name": "User2000",
   *            "createdAt": "2022-07-11T22:16:45.193Z",
   *            "updatedAt": "2022-07-11T22:23:51.232Z",
   *            "id": "62cca14d05338c3413904c3f"
   *        },
   *        "message": "Success: Rights updated.",
   *        "meta": {},
   *        "status": 200
   *    }
   */
  .put('/:id',
    middleware.ensureProperties([
      { from: 'params', key: 'id', required: true, format: 'id' },
      { from: 'body', key: 'name', required: true, format: 'string' },
      { from: 'body', key: 'level', required: true, format: 'number' }
    ]),
    actions.rights.update
  )
  // Rights DELETE/:id => Remove.
  /**
   * @api {delete} /rights/:id Delete
   * @apiName DeleteRight
   * @apiGroup Rights
   * @apiVersion 1.0.0
   *
   * @apiUse Authorization
   * @apiUse Permission0
   *
   * @apiParam {ObjectId} id Identifier of the targeted resource.
   *
   * @apiSuccess (Success 200) {Number} status=200                        Response status.
   * @apiSuccess (Success 200) {String} code="success.rights.remove"      Response code.
   * @apiSuccess (Success 200) {String} message="Success: Rights remove." Response message.
   * @apiSuccess (Success 200) {Object} meta                              Response metadata with id sent as param.
   * @apiSuccess (Success 200) {Object} data                              Empty object.
   *
   * @apiSuccessExample {json} Success-response
   *    {
   *        "code": "success.rights.remove",
   *        "data": {},
   *        "message": "Success: Rights removed.",
   *        "meta": {
   *            "query": {
   *                "id": "62cc9ed0ad89350325f65a3f"
   *            }
   *        },
   *        "status": 200
   *    }
   */
  .delete('/:id',
    middleware.ensureProperties([
      { from: 'params', key: 'id', required: true, format: 'id' }
    ]),
    actions.rights.remove
  );
