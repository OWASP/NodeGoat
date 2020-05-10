### Initialising database

This project uses MongoDB as its datastore. To initialise database with default values, use `artifacts/db-reset.js` script. By default it will try to connect to localhost, but other URL can be specified in config file or using `MONGO_URL` environment variable.
