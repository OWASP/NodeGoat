// default app configuration
var defaultConfig = {
    port: process.env.PORT || 5000,
    db: "mongodb://nodegoat:owasp@widmore.mongohq.com:10000/nodegoat"
};

module.exports = defaultConfig;
