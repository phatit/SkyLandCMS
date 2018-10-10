module.exports = async function validateController(req, res, next) {
  sails.log('VO VALIDATE POLICIES')
  var params = req.allParams();
  sails.log(params)

  if (ResponseService.checkRequireSession(req._parsedUrl.pathname)) {
    var session = req.headers['authorization'];
    console.log('Check session ===> passed ===>  ', session)
    if (!session) {
      return res.status(401).send('Session is invalid...');
    }
    var userSession = await UserSession.findOne({
      session
    });
    console.log('FIND ONE USER SESSION RES')
    console.log(userSession)
    if (!userSession) {
      return res.status(401).send('Session is invalid...');
    }

    const sessionData = JSON.parse(ResponseService.decryptDataRequest(sails.config.custom.encryptKey, userSession.dataSession));
    console.log('SESSION DECTYPT RES')
    console.log(sessionData)
    if (!sessionData) {
      return res.status(401).send('Session is invalid...');
    }

    if (!ResponseService.checkRequireRule(req._parsedUrl.pathname)) {
      req.query.session = sessionData;
      return next();
    }

    sessionData.permissions = [];
    const permissions = await sails.sendNativeQuery(`
      SELECT ua.url_api as url, up.is_checked as checked
      FROM user_permissions AS up
      JOIN permissions AS p ON up.permission_id = p.id
      JOIN url_allows AS ua ON ua.id = p.url_allow_id
      WHERE up.user_id = $1
      ORDER BY ua.url_api ASC
      `, [sessionData.userId]);
    if (permissions) {
      sessionData.permissions = permissions.rows;
    }

    console.log('SESSION DATA')
    console.log(sessionData)

    if (sails.config.rule.checkRule(req._parsedUrl.pathname, sessionData.permissions)) {
      req.query.session = sessionData;
      return next();
    }
    return res.status(403).send('Not allow!');
  }
  return next();
}