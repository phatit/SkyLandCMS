var ResponseService = {
  decryptDataRequest: function (encryptKey, data) {
    return CryptoService.decrypt(encryptKey, data);
  },
  encryptDataRequest: function (encryptKey, data) {
    return CryptoService.encrypt(encryptKey, data);
  },
  isJsonString: function (str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },
  checkRequireSession: function(path){
    var excludePathsCheckSession = sails.config.custom.excludePathsCheckSession;
    if(excludePathsCheckSession.indexOf(path) > -1){
      return false;
    }
    return true;

  },
  getResponse: function (encryptKey, params) {
    var data = CryptoService.encrypt(encryptKey, JSON.stringify(params));
    return data;
  },
  checkRequireRule: function(path){
    var excludePathsCheckSession = sails.config.custom.excludePathsRule;
    if(excludePathsCheckSession.indexOf(path) > -1){
      return false;
    }
    return true;

  },
  checkRequireParams: function (params, keys) {
    for (i in keys) {
      var key = keys[i];
      console.log('json[' + key + '] :' + params[key]);
      if (params[key] === undefined) {
        return 'Require all params: ' + keys.join(', ');
      }
    }
    return true;
  },
  getRandom: function (size) {
    var crypto = require('crypto');
    return crypto.randomBytes(size).toString('hex');
  },
}

module.exports = ResponseService
