By [TCell](https://www.tcell.io/).

TCell Hooks is to be used in conjuction with the [tcell_agent](https://www.npmjs.com/package/tcell-agent) to allow for custom event notifications of login failures and login successes.


## Getting started

You can manually add it to your `package.json` file or install and save it with the following command:

```javascript
npm install tcell-hooks --save
```

There are two options for calling the hooks from your application code:

- By providing an Express request object and having the TCell Agent extract the relevant details from it:
  ```javascript
  var TCellHooks = require('tcell-hooks').v1;

  // successful login
  var username = 'some-user-id',
      sessionId = req.sessionID,
      userValid = true
  TCellHooks.sendExpressLoginEventSuccess(req, username, sessionId, userValid);

  // failed login
  var username = 'some-user-id',
      sessionId = req.sessionID,
      userValid = false
  TCellHooks.sendExpressLoginEventFailure(req, username, sessionId, userValid);
  ```

- Or by providing each individual piece of information required for the TCell event:
  ```javascript
  var TCellHooks = require('tcell-hooks').v1;

  // successful login
  // NOTE: this is how you would obtain this info from an ExpressJS request.
  //       Obtaining this info in a different framework will likely differ
  var username = 'some-user-id',
      sessionId = req.sessionID,
      userAgent = req.get('User-Agent'),
      referrer = req.get('Referrer'),
      remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      headerKeys = Object.keys(req.headers),
      documentUri = req.protocol + '://' + req.get('Host') + req.originalUrl,
      userValid = true
  TCellHooks.sendLoginEventSuccess(
    username,
    sessionId,
    userAgent,
    referrer,
    remoteAddress,
    headerKeys,
    documentUri
    userValid);

  // failed login
  // NOTE: this is how you would obtain this info from an ExpressJS request.
  //       Obtaining this info in a different framework will likely differ
  var username = 'some-user-id',
      sessionId = req.sessionID,
      userAgent = req.get('User-Agent'),
      referrer = req.get('Referrer'),
      remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      headerKeys = Object.keys(req.headers),
      documentUri = req.protocol + '://' + req.get('Host') + req.originalUrl,
      userValid = false
  TCellHooks.sendLoginEventFailure(
    username,
    sessionId,
    userAgent,
    referrer,
    remoteAddress,
    headerKeys,
    documentUri
    userValid);
  ```
&nbsp;  

## Important Note

If the [tcell_agent](https://www.npmjs.com/package/tcell-agent) is not installed or if it's disabled, this code will do nothing and should have no performance effect on your app.
&nbsp;  
&nbsp;  

## API
```javascript
function sendLoginEventSuccess (
  userId,
  sessionId,
  userAgent,
  referrer,
  remoteAddress,
  headerKeys,
  documentUri,
  userValid) {
}
```

String  **userId** - Identification used for the user (i.e. email, username)  
String  **sessionId** - (Optional) Session ID for user logging in. This will be HMAC'ed by the Agent before being sent  
String  **userAgent** - (Optional) User agent taken from header  
String  **referrer** - (Optional) Referrer taken from header  
String  **remoteAddress** - (Optional) IP of the Request  
String  **headerKeys** - (Optional) An array of the header keys. The order is important (do not sort the array)  
String  **documentUri** - (Optional) Document URI taken from request  
Boolean **userValid** -  (Optional) Set as true if exists, other false. Defaults to nil.  
&nbsp;  

```javascript
function sendExpressLoginEventSuccess (
  request,
  userId,
  sessionId,
  userValid) {
}
```

Object  **request** - Request object provided by ExpressJS  
String  **userId** - Identification used for the user (i.e. email, username)  
String  **sessionId** - (Optional) Session ID for user logging in. This will be HMAC'ed by the Agent before being sent  
Boolean **userValid** -  (Optional) Set as true if exists, other false. Defaults to nil.  
