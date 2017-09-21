exports = module.exports = {}

var v1SendLoginEventSuccess = function (userId, sessionId, userAgent, referrer, remoteAddress, headerKeys, documentUri, userValid) {}
var v1SendLoginEventFailure = function (userId, sessionId, userAgent, referrer, remoteAddress, headerKeys, documentUri, userValid) {}

var v1SendExpressLoginEventSuccess = function (request, userId, sessionId, userValid) {}
var v1SendExpressLoginEventFailure = function (request, userId, sessionId, userValid) {}

exports.v1 = {
  'sendLoginEventSuccess': v1SendLoginEventSuccess,
  'sendLoginEventFailure': v1SendLoginEventFailure,
  'sendExpressLoginEventSuccess': v1SendExpressLoginEventSuccess,
  'sendExpressLoginEventFailure': v1SendExpressLoginEventFailure
}
