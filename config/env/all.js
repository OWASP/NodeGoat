// default app configuration
const port = process.env.PORT || 4000;
let db = process.env.MONGOLAB_URI || process.env.MONGODB_URI;

if (!db) {
    db = process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/nodegoat' : 'mongodb://nodegoat:owasp@nodegoat-cluster-shard-00-00.zkkl5.mongodb.net:27017,nodegoat-cluster-shard-00-01.zkkl5.mongodb.net:27017,nodegoat-cluster-shard-00-02.zkkl5.mongodb.net:27017/nodegoat?ssl=true&replicaSet=atlas-qajmlr-shard-0&authSource=admin&retryWrites=true&w=majority';
}

module.exports = {
    port,
    db,
    cookieSecret: "session_cookie_secret_key_here",
    cryptoKey: "a_secure_key_for_crypto_here",
    cryptoAlgo: "aes256",
    hostName: "localhost"
};
