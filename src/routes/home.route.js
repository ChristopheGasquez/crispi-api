import express from 'express';
import actions from '../actions/index.js';

export default express
  // Defined express router
  .Router()
  // Home GET => Server status.
  /**
   * @api {get} / Server status
   * @apiName GetHome
   * @apiGroup Home
   * @apiVersion 1.0.0
   *
   * @apiSuccess (Success 200) {Number} status=200                        Response status.
   * @apiSuccess (Success 200) {String} code="success.server.enable"      Response code.
   * @apiSuccess (Success 200) {String} message="Success: Server enable." Response message.
   * @apiSuccess (Success 200) {Object} meta                              Empty object.
   * @apiSuccess (Success 200) {Object} data                              Empty object.
   *
   * @apiSuccessExample {json} Success-response
   *    {
   *        "code": "success.server.enable",
   *        "data": {},
   *        "message": "Success: Server enable.",
   *        "meta": {},
   *        "status": 200
   *    }
   *
   * @apiError (Error 404) {Number} status=404                           Response status
   * @apiError (Error 404) {String} code="serror.notFound"               Response code.
   * @apiError (Error 404) {String} message="Error: Resource not found." Response message.
   * @apiError (Error 404) {Object} meta                                 Empty object.
   * @apiError (Error 404) {Object} data                                 Empty object.
   *
   * @apiErrorExample {json} Error-response
   *    {
   *        "code": "error.notFound",
   *        "data": {},
   *        "message": "Error: Resource not found.",
   *        "meta": {},
   *        "status": 404
   *    }
   */
  .get(
    '/',
    actions.serverStatus
  );
