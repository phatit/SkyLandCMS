var crypto = require('crypto');

var iv = new Buffer(0);
var autoPadding = true;
var alg = 'des-ede3';

var CryptoService = {
  tripleDesEncrypt: function (key, data) {
    try {
      var md5Key = crypto.createHash('md5').update(key).digest('hex')
      md5Key = md5Key.substring(0, 24);
      //console.log('md5Key: '+md5Key);
      md5Key = new Buffer(md5Key);
      var cipher = crypto.createCipheriv(alg, md5Key, iv);
      cipher.setAutoPadding(autoPadding)  //default true
      var ciph = cipher.update(data, 'utf8', 'base64');
      ciph += cipher.final('base64');
      //console.log(ciph);
      return ciph;
    } catch (e) {
      sails.log.error(e);
      return null;
    }
  },
  tripleDesDecrypt: function (key, data) {
    try {
      var md5Key = crypto.createHash('md5').update(key).digest('hex')
      md5Key = md5Key.substring(0, 24);
      //console.log('md5Key: '+md5Key);
      md5Key = new Buffer(md5Key);
      var decipher = crypto.createDecipheriv(alg, md5Key, iv);
      decipher.setAutoPadding(autoPadding)
      var txt = decipher.update(data, 'base64', 'utf8');
      txt += decipher.final('utf8');
      return txt;
    } catch (e) {
      sails.log.error(e);
      return null;
    }


  },
  encrypt: function (key, data) {
    try{
      var cipher = crypto.createCipheriv('aes-128-ecb', key, "");
      var encrypted = cipher.update(data, 'utf8', 'base64');
      encrypted += cipher.final('base64');
      return encrypted;
    }catch (e){
      sails.log.error(e);
      return null;
    }

  },

  decrypt: function (key, data) {
    try{
      var cipher = crypto.createDecipheriv('aes-128-ecb', key, "");
      var encrypted = cipher.update(data, 'base64', 'utf8');
      encrypted += cipher.final('utf8');
      return encrypted;
    }catch (e){
      sails.log.error(e);
      return null;
    }

  },
  md5: function (data) {
    return crypto.createHash('md5').update(data).digest('hex')
  }
};

module.exports = CryptoService;
