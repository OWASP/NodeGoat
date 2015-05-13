// default app configuration
var defaultConfig = {
    port: process.env.PORT || 4000,
    db: process.env.MONGODB_URL || "mongodb://nodegoat:owasp@widmore.mongohq.com:10000/nodegoat",
    cookieSecret: "session_cookie_secret_key_here",
    cryptoKey: "a_secure_key_for_crypto_here",
    cryptoAlgo: "aes256"
};

module.exports = defaultConfig;
