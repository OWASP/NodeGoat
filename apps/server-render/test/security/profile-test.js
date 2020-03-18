var config = require("../../config/config");
var assert = require("assert");
var should = require("should");
var async = require("async");
var By = require("selenium-webdriver").By;
var chromeDriver = require("chromedriver");

// Documentation for the selenium JS webdriver: https://code.google.com/p/selenium/wiki/WebDriverJs
var seleniumWebdriver = require("selenium-webdriver");
var webDriver;
var chrome = require("selenium-webdriver/chrome");
var test = require("selenium-webdriver/testing");
var proxy = require("selenium-webdriver/proxy");
var path = chromeDriver.path;
var service = new chrome.ServiceBuilder(path).build();

// SUT is an acronym for System Under Test.
var sutProtocol = "http://";
var zapTargetApp = sutProtocol + config.hostName + ":" + config.port + "/";
var zapOptions = {
    proxy: (sutProtocol + config.zapHostName + ":" + config.zapPort + "/"),
    targetApp: zapTargetApp
};
var ZapClient = require("zaproxy");
var zaproxy = new ZapClient(zapOptions);
var zapTargetAppRoute = "profile";
var zapTargetAppAndRoute = zapTargetApp + zapTargetAppRoute;
var zapApiKey = config.zapApiKey;
var fs = require("fs");

var state = {
    description: "",
    error: null
};

var sutUserName = "user1";
var sutUserPassword = "User1_123";

chrome.setDefaultService(service);

// Easiest way to understand how this works and go through the steps is to
// setup authentication for a user using Zap manually first
// using the following link: https://github.com/zaproxy/zaproxy/wiki/FAQformauth
// Then browse the Zap API viewing the existing manual setup through the views. Use that to formulate your code.
// Another link I found useful: // http://stackoverflow.com/questions/27596775/zap-authentication-using-api-calls

test.before(function() {
    "use strict";
    this.timeout(20000);
    webDriver = new seleniumWebdriver.Builder()
        .withCapabilities(seleniumWebdriver.Capabilities.chrome())
        // http://code.tutsplus.com/tutorials/an-introduction-to-webdriver-using-the-javascript-bindings--cms-21855
        // Proxy all requests through Zap before using Zap to find vulnerabilities,
        // otherwise Zap will say: "URL not found in the scan tree".
        .setProxy(proxy.manual({
            http: config.zapHostName + ":" + config.zapPort
        }))
        .build();
    webDriver.getWindowHandle();
    webDriver.get(zapTargetApp);
    webDriver.sleep(1000);
    webDriver.findElement(By.name("userName")).sendKeys(sutUserName);
    webDriver.findElement(By.name("password")).sendKeys(sutUserPassword);
    webDriver.sleep(1000);
    webDriver.findElement({
        tagName: "button",
        type: "submit"
    }).click();
    webDriver.sleep(1000);
    webDriver.get(zapTargetAppAndRoute);
    webDriver.sleep(1000);
    webDriver.findElement(By.name("firstName")).sendKeys("seleniumJohn");
    webDriver.findElement(By.name("lastName")).sendKeys("seleniumDoe");
    webDriver.findElement(By.name("ssn")).sendKeys("seleniumSSN");
    webDriver.findElement(By.name("dob")).sendKeys("12/23/5678");
    webDriver.findElement(By.name("bankAcc")).sendKeys("seleniumBankAcc");
    webDriver.findElement(By.name("bankRouting")).sendKeys("0198212#");
    webDriver.findElement(By.name("address")).sendKeys("seleniumAddress");
    webDriver.findElement(By.name("submit")).click();
    webDriver.sleep(1000);
});
test.after(function() {
    "use strict";
    var overWrite = true;
    this.timeout(10000);
    webDriver.quit();
    zaproxy.core.newSession("new NodeGoat session", overWrite, zapApiKey, function() {});
    //zaproxy.core.shutdown(zapApiKey, function () {});
});


test.describe(zapTargetAppRoute + " regression test suite", function() {
    "use strict";
    this.timeout(0);

    // Links that were useful for getting up and running:
    // http://simpleprogrammer.com/2014/02/03/selenium-with-node-js/
    // http://www.vapidspace.com/coding/2014/02/08/automating-selenium-tests-with-grunt-and-mocha/
    // http://bites.goodeggs.com/posts/selenium-webdriver-nodejs-tutorial/
    test.it("Should not exceed the decided threshold of vulnerabilities known to Zap", function(done) {
        var contextId = 1;
        var userId;
        var maxChildren = 1;
        var alertThreshold = 3;
        var numberOfAlerts;
        var scanId;
        var zapInProgressIntervalId;
        // Todo: Let's do something with resultsFromAllAsyncSeriesFunctions.
        var onCompletion = function(error, resultsFromAllAsyncSeriesFunctions) {
            if (!error)
                console.log(
                    resultsFromAllAsyncSeriesFunctions[resultsFromAllAsyncSeriesFunctions.length - 1].description
                );
            else throw error;
            if (numberOfAlerts > alertThreshold) {
                console.log(
                    "Search the generated report for \"/" +
                    zapTargetAppRoute +
                    "\" to see the " +
                    (numberOfAlerts - alertThreshold) +
                    " vulnerabilities that exceed the user defined threshold of: " +
                    alertThreshold
                );
            }
            numberOfAlerts.should.be.lessThanOrEqual(alertThreshold);
            done();
        };

        async.series([

            function spider(spiderDone) {
                zaproxy.spider.scan(zapTargetApp, maxChildren, zapApiKey, function(err, resp) {
                    spiderDone(state.error, state);
                });
            },
            function includeInZapContext(includeInZapContextDone) {
                // Inform Zap how to authenticate itself.
                zaproxy.context.includeInContext("Default Context", "\\Q" + zapTargetApp + "\E.*", zapApiKey, function(err, resp) {
                    includeInZapContextDone(state.error);
                });
            },
            function setAuthenticationMethod(setAuthenticationMethodDone) {
                zaproxy.authentication.setAuthenticationMethod(
                    contextId,
                    "formBasedAuthentication",
                    // Only the 'userName' onwards must be URL encoded. URL encoding entire line doesn't work.
                    "loginUrl=" +
                    zapTargetApp +
                    "login&loginRequestData=userName%3D%7B%25username%25%7D%26password%3D%7B%25password%25%7D%26_csrf%3D",
                    zapApiKey,
                    function(err, resp) {
                        setAuthenticationMethodDone(state.error);

                    }
                );
            },
            function setLoggedInIndicator(setLoggedInIndicatorDone) {
                // contextId, loggedInIndicatorRegex
                zaproxy.authentication.setLoggedInIndicator(
                    contextId,
                    "\Q<p>Moved Temporarily. Redirecting to <a href='/dashboard'>/dashboard</a></p>\E",
                    zapApiKey,
                    function(err, resp) {
                        setLoggedInIndicatorDone(state.error);
                    }
                );
            },
            function setForcedUserModeEnabled(setForcedUserModeEnabledDone) {
                var enabled = true;
                zaproxy.forcedUser.setForcedUserModeEnabled(enabled, zapApiKey, function(err, resp) {
                    setForcedUserModeEnabledDone(state.error);
                });
            },
            function newUser(newUserDone) {
                zaproxy.users.newUser(contextId, sutUserName, zapApiKey, function(err, resp) {
                    userId = resp.userId;
                    newUserDone(state.error);
                });
            },
            function setForcedUser(setForcedUserDone) {
                zaproxy.forcedUser.setForcedUser(contextId, userId, zapApiKey, function(err, resp) {
                    setForcedUserDone(state.error);
                });
            },
            function setAuthenticationCredentials(setAuthenticationCredentialsDone) {
                zaproxy.users.setAuthenticationCredentials(
                    contextId,
                    userId,
                    "username=" + sutUserName + "&" + "password=" + sutUserPassword,
                    zapApiKey,
                    function(err, resp) {
                        setAuthenticationCredentialsDone(state.error);
                    }
                );
            },
            function setUserEnabled(setUserEnabledDone) { // User should already be enabled?
                var enabled = true;
                zaproxy.users.setUserEnabled(contextId, userId, enabled, zapApiKey, function(err, resp) {
                    setUserEnabledDone(state.error);
                });
            },
            function spiderAsUserForRoot(spiderAsUserForDone) {
                zaproxy.spider.scanAsUser(zapTargetApp, contextId, userId, maxChildren, zapApiKey, function(err, resp) {
                    spiderAsUserForDone(state.error);
                });
            },
            function activeScan(activeScanDone) {
                zaproxy.ascan.scan(
                    zapTargetAppAndRoute,
                    true,
                    false,
                    "",
                    "POST",
                    "firstName=JohnseleniumJohn&lastName=DoeseleniumDoe&ssn=seleniumSSN&dob=12/23/5678&bankAcc=seleniumBankAcc&bankRouting=0198212#&address=seleniumAddress&_csrf=&submit=",
                    zapApiKey,
                    function(err, resp) {
                        var statusValue;
                        var zapError;

                        scanId = resp.scan;

                        function status() {
                            zaproxy.ascan.status(scanId, function(err, resp) {
                                if (resp) statusValue = resp.status;
                                if (err) zapError = (err.code === "ECONNREFUSED") ? err : "";
                                zaproxy.core.numberOfAlerts(zapTargetAppAndRoute, function(err, resp) {
                                    if (resp) numberOfAlerts = resp.numberOfAlerts;
                                    //else console.log(err);
                                    console.log(
                                        "Scan " +
                                        scanId +
                                        " is " +
                                        statusValue +
                                        "% complete with " +
                                        numberOfAlerts +
                                        " alerts."
                                    );
                                });
                            });
                        }
                        zapInProgressIntervalId = setInterval(function() {
                            status();
                            if (zapError && statusValue !== String(100)) {
                                console.log("Canceling test. Zap API is unreachible.");
                                clearInterval(zapInProgressIntervalId);
                                activeScanDone(zapError);
                            } else if (statusValue === String(100)) {
                                console.log(
                                    "We are finishing scan " +
                                    scanId +
                                    ". Please see the report for further details."
                                );
                                clearInterval(zapInProgressIntervalId);
                                status();
                                console.log("About to write report.");
                                zaproxy.core.htmlreport(zapApiKey, function(err, resp) {
                                    var date = new Date();
                                    var reportPath = __dirname +
                                        "/report_" +
                                        date.getFullYear() +
                                        "-" +
                                        (date.getMonth() + 1) +
                                        "-" +
                                        date.getDate() +
                                        "-" +
                                        date.getHours() +
                                        "-" +
                                        date.getMinutes() +
                                        ".html";
                                    console.log("Writing report to " + reportPath);
                                    fs.writeFile(reportPath, resp, function(err) {
                                        if (err) console.log(err);
                                        activeScanDone(state.error, state);
                                    });
                                });

                            }
                        }, config.zapApiFeedbackSpeed);

                    });
            }
        ], onCompletion);

    });

});
