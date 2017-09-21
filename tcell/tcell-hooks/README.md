By [TCell](https://www.tcell.io/).

TCell Hooks is to be used in conjuction with the [tcell_agent](https://www.npmjs.com/package/tcell-agent) to allow for custom event notifications of login failures and login successes.

## Getting started

You can add it to your package.json file with:

```node
npm install tcell-hooks --save
```

There are two options for calling the hooks from your application code:

By providing an Express request object and having the TCell Agent extract the relevant details from it:

```node
var tcellHooks = require('tcell-hooks').v1;

var username = 'some-user-id',
    sessionId = req.sessionID,
    userValid = true
tcellHooks.sendExpressLoginEventSuccess(username, sessionId, req, userValid);

var username = 'some-user-id',
    sessionId = req.sessionID,
    userValid = false
tcellHooks.sendExpressLoginEventFailure(username, sessionId, req, userValid);
```

Or by providing each individual piece of information required for the TCell event:

```node
var tcellHooks = require('tcell-hooks').v1;

// NOTE: this is how you would obtain this info from an ExpressJS request.
//       Obtaining this info in a different framework will likely differ
var username = 'some-user-id',
    sessionId = req.sessionID,
    userAgent = req.get('User-Agent'),
    referrer = req.get('Referrer'),
    remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    headerKeys = Object.keys(req.headers),
    documentUri = req.protocol + '://' + req.get('Host') + req.originalUrl),
    userValid = true
tcellHooks.sendLoginEventSuccess(
  username,
  sessionId,
  userAgent,
  referrer,
  remoteAddress,
  headerKeys,
  documentUri
  userValid);

// NOTE: this is how you would obtain this info from an ExpressJS request.
//       Obtaining this info in a different framework will likely differ
var username = 'some-user-id',
    sessionId = req.sessionID,
    userAgent = req.get('User-Agent'),
    referrer = req.get('Referrer'),
    remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    headerKeys = Object.keys(req.headers),
    documentUri = req.protocol + '://' + req.get('Host') + req.originalUrl),
    userValid = false
tcellHooks.sendLoginEventFailure(
  username,
  sessionId,
  userAgent,
  referrer,
  remoteAddress,
  headerKeys,
  documentUri
  userValid);
```


## Important Note

If the [tcell_agent](https://www.npmjs.com/package/tcell-agent) is not installed or if it's disabled, this code will do nothing and should have no performance effect on your app.
