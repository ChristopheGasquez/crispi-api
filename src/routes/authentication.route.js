import express from 'express';
import actions from '../actions/index.js';
import middleware from '../middlewares/index.js';

export default express
  // Defined express router
  .Router()
  // Authentication POST => Login.
  /**
   * @api {post} /authentication Login
   * @apiName postAuthentication
   * @apiGroup Authentication
   * @apiVersion 1.0.0
   *
   * @apiBody {String} email Email of the issuer.
   * @apiBody {String} password Password of the issuer.
   *
   * @apiSuccess (Success 201) {Number} status=201                          Response status.
   * @apiSuccess (Success 201) {String} code="success.authentication.login" Response code.
   * @apiSuccess (Success 201) {String} message="Success: Login."           Response message.
   * @apiSuccess (Success 201) {Object} meta                                Empty object.
   * @apiSuccess (Success 201) {Login}  data                                Login created (contained: access token, refresh token ans credential).
   *
   * @apiSuccessExample {json} Success-response
   *    {
   *        "code": "success.authentication.login",
   *        "data": {
   *            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzFiMDZhMWVjNWNlOWM4NWNlNGE1NyIsInJpZ2h0IjoiNjJiYTQwYjI5ZjcwZDAxYjgxMzU2YjUzIiwiaWF0IjoxNjU3NzA2ODQ4LCJleHAiOjE2NTc3OTMyNDh9.TBltYpPo0o_WXGb1bnNCzwUGNNyCKGa6-gtyXj2prFk",
   *            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzFiMDZhMWVjNWNlOWM4NWNlNGE1NyIsInJpZ2h0IjoiNjJiYTQwYjI5ZjcwZDAxYjgxMzU2YjUzIiwiaWF0IjoxNjU3NzA2ODQ4LCJleHAiOjE2NjI4OTA4NDh9.T1RqNoXD3cEqhNDfwuh73scJh0g_L3Dx6856zcWVWYQ",
   *            "credential": {
   *                "email": "user.0@email.com",
   *                "isEmailConfirmed": false,
   *                "right": {
   *                    "level": 0,
   *                    "name": "Administrator",
   *                    "id": "62ba40b29f70d01b81356b53"
   *                },
   *                "id": "62c1b06a1ec5ce9c85ce4a57"
   *            }
   *        },
   *        "message": "Success: Login.",
   *        "meta": {},
   *        "status": 201
   *    }
   *
   * @apiError (Error 404) {Number} status=404                           Response status
   * @apiError (Error 404) {String} code="serror.notFound"               Response code.
   * @apiError (Error 404) {String} message="Error: Resource not found." Response message.
   * @apiError (Error 404) {Object} meta                                 Potential reason of the error.
   * @apiError (Error 404) {Object} data                                 Empty object.
   *
   * @apiErrorExample {json} Error-response
   *    {
   *        "code": "error.notFound",
   *        "data": {},
   *        "message": "Error: Resource not found.",
   *        "meta": {
   *            "reason": "Error: Invalid credential."
   *        },
   *        "status": 404
   *    }
   */
  .post(
    '/',
    middleware.ensureProperties([
      { from: 'body', key: 'email', required: true, format: 'email' },
      { from: 'body', key: 'password', required: true, format: 'password' },
    ]),
    middleware.encryptProperty('password'),
    actions.authentication.login
  )
  // Authentication PUT => Refresh.
  /**
   * @api {put} /authentication Refresh
   * @apiName putAuthentication
   * @apiGroup Authentication
   * @apiVersion 1.0.0
   *
   * @apiHeader {Token} Authorization="Bearer " RefreshToken retrieved during authentication prefixed by the discriminant 'bearer '.
   * @apiHeaderExample {json} Authorization example:
   *    {
   *        "Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzFiMDZhMWVjNWNlOWM4NWNlNGE1NyIsInJpZ2h0IjoiNjJiYTQwYjI5ZjcwZDAxYjgxMzU2YjUzIiwiaWF0IjoxNjU3NzI1MjU2LCJleHAiOjE2NjI5MDkyNTZ9.ZPxB79L9q3bULWe1d4T_qqH3DzlyiIRKUmRLXD2tVHc"
   *    }
   *
   * @apiSuccess (Success 200) {Number} status=201                          Response status.
   * @apiSuccess (Success 200) {String} code="success.authentication.login" Response code.
   * @apiSuccess (Success 200) {String} message="Success: Login."           Response message.
   * @apiSuccess (Success 200) {Object} meta                                Empty object.
   * @apiSuccess (Success 200) {Login}  data                                Login updated (contained: access token, refresh token ans credential).
   *
   * @apiSuccessExample {json} Success-response
   *    {
   *        "code": "success.authentication.refresh",
   *        "data": {
   *            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzFiMDZhMWVjNWNlOWM4NWNlNGE1NyIsInJpZ2h0IjoiNjJiYTQwYjI5ZjcwZDAxYjgxMzU2YjUzIiwiaWF0IjoxNjU3NzA2ODQ4LCJleHAiOjE2NTc3OTMyNDh9.TBltYpPo0o_WXGb1bnNCzwUGNNyCKGa6-gtyXj2prFk",
   *            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzFiMDZhMWVjNWNlOWM4NWNlNGE1NyIsInJpZ2h0IjoiNjJiYTQwYjI5ZjcwZDAxYjgxMzU2YjUzIiwiaWF0IjoxNjU3NzA2ODQ4LCJleHAiOjE2NjI4OTA4NDh9.T1RqNoXD3cEqhNDfwuh73scJh0g_L3Dx6856zcWVWYQ",
   *            "credential": {
   *                "email": "user.0@email.com",
   *                "isEmailConfirmed": false,
   *                "right": {
   *                    "level": 0,
   *                    "name": "Administrator",
   *                    "id": "62ba40b29f70d01b81356b53"
   *                },
   *                "id": "62c1b06a1ec5ce9c85ce4a57"
   *            }
   *        },
   *        "message": "Success: Refresh.",
   *        "meta": {},
   *        "status": 200
   *    }
   *
   * @apiError (Error 401) {Number} status=401                                              Response status
   * @apiError (Error 401) {String} code="error.authentication.jsonWebTokenError"           Response code.
   * @apiError (Error 401) {String} message="Error: Authorization on header request error." Response message.
   * @apiError (Error 401) {Object} meta                                                    Potential reason of the error an his emplacement.
   * @apiError (Error 401) {Object} data                                                    Empty object.
   *
   * @apiErrorExample {json} Error-response
   *    {
   *        "code": "error.authentication.jsonWebTokenError",
   *        "data": {},
   *        "message": "Error: Authorization on header request error.",
   *        "meta": {
   *            "field": "Authorization",
   *            "reason": "invalid token"
   *        },
   *        "status": 401
   *    }
   */
  .put(
    '/',
    middleware.ensureAuthorization(),
    actions.authentication.refresh
  )
  // Authentication DELETE => Logout.
  /**
   * @api {delete} /authentication Logout
   * @apiName deleteAuthentication
   * @apiGroup Authentication
   * @apiVersion 1.0.0
   *
   * @apiUse Authorization
   *
   * @apiSuccess (Success 200) {Number} status=201                           Response status.
   * @apiSuccess (Success 200) {String} code="success.authentication.logout" Response code.
   * @apiSuccess (Success 200) {String} message="Success: Logout."           Response message.
   * @apiSuccess (Success 200) {Object} meta                                 Empty object.
   * @apiSuccess (Success 200) {Login}  data                                 Login with empty properties (contained: access token, refresh token ans credential).
   *
   * @apiSuccessExample {json} Success-response
   *    {
   *    "code": "success.authentication.logout",
   *    "data": {
   *        "accessToken": "",
   *        "refreshToken": "",
   *        "credential": {}
   *    },
   *    "message": "Success: Logout.",
   *    "meta": {},
   *    "status": 200
   *    }
   */
  .delete(
    '/',
    middleware.ensureAuthorization(),
    actions.authentication.logout
  );
