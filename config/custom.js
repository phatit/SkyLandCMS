/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {
  allowedTypes: [
    'image/jpeg', 'image/png'
  ],
  maximumFileUploadSize: 10 * 1024 * 1024, //maximum: 10MB
  // Khong can kiem tra data
  excludePathsData: ['public/tmp', 'public/images'],
  // Khong can kiem tra app
  excludePathsCheckApp: [],
  // Khong can kiem tra session & path
  excludePathsCheckSession: [
    '/v1/user/login',
  ],
  // Khong can kiem tra rule
  excludePathsRule: [
    '/v1/user/login',
    '/v1/user/logout',
  ],
  encryptKey: "F5XCSRHBFA52HZZ4",
  totalItemPaging: 10,
  STATUS_ACTIVE: 1,
  STATUS_DELETE: -2,
  USER_KIND_DEVELOPER: 1,
  USER_KIND_ORTHER: 2,
  MALE: 1,
  FEMALE: 2,
  ORTHER: 0,
};
