// default app configuration

var port = process.env.PORT || 4000;
var db = process.env.NODE_ENV === 'test' ? "mongodb://localhost:27017/nodegoat" : "mongodb://nodegoat:owasp@ds159217.mlab.com:59217/nodegoat";
db = db || process.env.MONGOLAB_URI || process.env.MONGODB_URI;

module.exports = {
    port: port,
    db:  db,
    cookieSecret: "session_cookie_secret_key_here",
    cryptoKey: "a_secure_key_for_crypto_here",
    cryptoAlgo: "aes256",
    hostName: "localhost"
};
