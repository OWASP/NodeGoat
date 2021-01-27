module.exports = {
   // If you want to debug regression tests, you will need the following which is also in the test config:
   zapHostName: "192.168.56.20",
   zapPort: "8080",
   // Required from Zap 2.4.1. This key is set in Zap Options -> API _Api Key.
   zapApiKey: "v9dn0balpqas1pcc281tn5ood1",
   // Required if debugging security regression tests.
   zapApiFeedbackSpeed: 5000, // Milliseconds.
   environmentalScripts: [
      // jshint -W101
      `<script>document.write("<script src='http://" + (location.host || "localhost").split(":")[0] + ":35729/livereload.js'></" + "script>");</script>`
      // jshint +W101
   ]
};
