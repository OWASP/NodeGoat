module.exports = {
   // Local instance.
   // To install mongodb: https://docs.mongodb.org/manual/tutorial/
   // With mongodb installed, All you should need to do is uncomment the `db` property below, and run the following command:
   // grunt db-reset:development
   // That will create the local nodegoat data-store, or restore it to a clean state if it already exists.

   db: "mongodb://localhost:27017/nodegoat",

   // If you want to use a MongoLab instance, just sign up for it, create a data-store, in this example we call it nodegoat.
   // and again just run the grunt db-reset:development command
   //db: 'mongodb://<dbuser>:<dbpassword>@<databasename>',

   // If you want to debug regression tests, you will need the following which is also in the test config:
   zapHostName: "192.168.56.20",
   zapPort: "8080",
   // Required from Zap 2.4.1. This key is set in Zap Options -> API _Api Key.
   zapApiKey: "v9dn0balpqas1pcc281tn5ood1",
   // Required if debugging security regression tests.
   zapApiFeedbackSpeed: 5000 // Milliseconds.
};
