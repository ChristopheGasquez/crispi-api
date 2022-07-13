import authentication from './authentication.route.js';
import credentials from './credentials.route.js';
import home from './home.route.js';
import rights from './rights.route.js';

export default {
  authentication,
  credentials,
  home,
  rights,
};

/**
 * @apiDefine Authorization
 * @apiHeader {Token} Authorization="Bearer " Token retrieved during authentication prefixed by the discriminant 'bearer '.
 * @apiHeaderExample {json} Authorization example:
 *    {
 *        "Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzFiMDZhMWVjNWNlOWM4NWNlNGE1NyIsInJpZ2h0IjoiNjJiYTQwYjI5ZjcwZDAxYjgxMzU2YjUzIiwiaWF0IjoxNjU3NTMyNzY3LCJleHAiOjE2NTc2MTkxNjd9._OelXGibz2_uvoZz_le8t6FH8jqnntEdEFz8Vwls1Ic"
 *    }
 */

/**
 * @apiDefine Permission0
 * @apiPermission Administrator (or level less than or equal to 0).
 */
