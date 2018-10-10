/**
 * Datastores
 * (sails.config.datastores)
 *
 * A set of datastore configurations which tell Sails where to fetch or save
 * data when you execute built-in model methods like `.find()` and `.create()`.
 *
 *  > This file is mainly useful for configuring your development database,
 *  > as well as any additional one-off databases used by individual models.
 *  > Ready to go live?  Head towards `config/env/production.js`.
 *
 * For more information on configuring datastores, check out:
 * https://sailsjs.com/config/datastores
 */

module.exports.datastores = {


  /***************************************************************************
  *                                                                          *
  * Your app's default datastore.                                            *
  *                                                                          *
  * Sails apps read and write to local disk by default, using a built-in     *
  * database adapter called `sails-disk`.  This feature is purely for        *
  * convenience during development; since `sails-disk` is not designed for   *
  * use in a production environment.                                         *
  *                                                                          *
  * To use a different db _in development_, follow the directions below.     *
  * Otherwise, just leave the default datastore as-is, with no `adapter`.    *
  *                                                                          *
  * (For production configuration, see `config/env/production.js`.)          *
  *                                                                          *
  ***************************************************************************/

  default: {

    /***************************************************************************
    *                                                                          *
    * Want to use a different database during development?                     *
    *                                                                          *
    * 1. Choose an adapter:                                                    *
    *    https://sailsjs.com/plugins/databases                                 *
    *                                                                          *
    * 2. Install it as a dependency of your Sails app.                         *
    *    (For example:  npm install sails-mysql --save)                        *
    *                                                                          *
    * 3. Then pass it in, along with a connection URL.                         *
    *    (See https://sailsjs.com/config/datastores for help.)                 *
    *                                                                          *
    ***************************************************************************/
    // adapter: 'sails-mysql',
    // url: 'mysql://user:password@host:port/database',
    adapter: require('sails-postgresql'),
    url: 'postgres://hnantsagjzfwrl:16dbe72e901ad3ce4341a037c0cbd1fc3fd06efa118e2281de76df71a187d743@ec2-54-221-210-97.compute-1.amazonaws.com:5432/dcbg2uieth7ou0?ssl=true',
    //pool: 10,
    //adapter: 'waterline-postgresql',
    // database: 'dcbg2uieth7ou0',
    // host: 'ec2-54-221-210-97.compute-1.amazonaws.com',
    // user: 'hnantsagjzfwrl',
    // password: '16dbe72e901ad3ce4341a037c0cbd1fc3fd06efa118e2281de76df71a187d743',
    // port: 5432,
    ssl: true,
    /**
     * Pool configuration
     */
    pool: {
      min: 2,
      max: 20
    }
  },
};
