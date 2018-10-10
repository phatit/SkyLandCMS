/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  'POST /v1/user/login': 'v1/UserController.login',
  'GET /v1/users': 'v1/UserController.list',
  'POST /v1/user/add': 'v1/UserController.add',
  'POST /v1/user/get': 'v1/UserController.get',
  'POST /v1/user/update': 'v1/UserController.update',
  'POST /v1/user/get-permission': 'v1/UserController.get_permission',
  'POST /v1/user/update-permission': 'v1/UserController.update_permission',

  'GET /v1/url-allows': 'v1/UrlAllowController.list',
  'POST /v1/url-allow/add': 'v1/UrlAllowController.add',
  'POST /v1/url-allow/get': 'v1/UrlAllowController.get',
  'POST /v1/url-allow/update': 'v1/UrlAllowController.update',

  'POST /v1/permissions': 'v1/PermissionsController.list',
  'POST /v1/permission/add': 'v1/PermissionsController.add',
  'POST /v1/permission/get': 'v1/PermissionsController.get',
  'POST /v1/permission/update': 'v1/PermissionsController.update',

  'GET /v1/categories': 'v1/CategoriesController.list',
  'POST /v1/category/add': 'v1/CategoriesController.add',
  'POST /v1/category/get': 'v1/CategoriesController.get',
  'POST /v1/category/update': 'v1/CategoriesController.update',

  'GET /v1/menu': 'v1/MenuController.list',
  'POST /v1/menu/add': 'v1/MenuController.add',
  'POST /v1/menu/get': 'v1/MenuController.get',
  'POST /v1/menu/update': 'v1/MenuController.update',
};
