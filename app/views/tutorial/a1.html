{% extends "./layout.html" %} {% block title %}A1 - Injection {% endblock %} {% block content %}
<div class="row">
    <div class="col-lg-12">
        <div class="bs-example" style="margin-bottom: 40px;">
            <span class="label label-danger">Exploitability: EASY</span>
            <span class="label label-warning">Prevalence: COMMON</span>
            <span class="label label-warning">Detectability: AVERAGE</span>
            <span class="label label-danger">Technical Impact: SEVERE</span>
        </div>
    </div>
</div>


<div class="row">
    <div class="col-lg-12">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">Description</h3>
            </div>
            <div class="panel-body">
                Injection flaws occur when untrusted data is sent to an interpreter as part of a command or query. The attacker’s hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.
            </div>
        </div>
        <!--
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">Real World Attack Incident Examples</h3>
            </div>
            <div class="panel-body">
                Screencast here ...
            </div>
        </div>
        -->
    </div>
</div>


<!-- accordions -->
<div class="panel-group" id="accordion">
    <div class="panel panel-info">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                    <i class="fa fa-chevron-down"></i>A1 - 1 Server Side JS Injection
                </a>
            </h4>
        </div>
        <div id="collapseOne" class="panel-collapse collapse in">
            <div class="panel-body">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Description</h3>
                    </div>
                    <div class="panel-body">
                        When
                        <code>eval()</code>,
                        <code>setTimeout()</code>,
                        <code>setInterval()</code>,
                        <code>Function()</code>are used to process user provided inputs, it can be exploited by an attacker to inject and execute malicious JavaScript code on server.
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Attack Mechanics</h3>
                    </div>
                    <div class="panel-body">
                        <p>
                            Web applications using the JavaScript
                            <code>eval()</code>function to parse the incoming data without any type of input validation are vulnerable to this attack. An attacker can inject arbitrary JavaScript code to be executed on the server. Similarly
                            <code>setTimeout()</code>, and
                            <code>setInterval()</code>functions can take code in string format as a first argument causing same issues as
                            <code>eval()</code>.
                        </p>
                        <p>This vulnerability can be very critical and damaging by allowing attacker to send various types of commands.</p>
                        <p>
                            <b>Denial of Service Attack:</b>
                        </p>
                        <iframe width="560" height="315" src="//www.youtube.com/embed/krOx9QWwcYw?rel=0" frameborder="0" allowfullscreen></iframe>
                        <p>
                            An effective denial-of-service attack can be executed simply by sending the commands below to
                            <code>eval()</code>function:
                        </p>


                        <pre>while(1)</pre>
                        <p>
                            This input will cause the target server's event loop to use 100% of its processor time and unable to process any other incoming requests until process is restarted.
                        </p>
                        <p>
                            An alternative DoS attack would be to simply exit or kill the running process:
                            <pre>process.exit()</pre> or <pre>process.kill(process.pid) </pre>
                        </p>
                        <p>
                            <b>File System Access</b>
                            <br/>
                        </p>
                        <iframe width="560" height="315" src="//www.youtube.com/embed/Mr-Jh9bjSLo?rel=0" frameborder="0" allowfullscreen></iframe>
                        <p>
                            Another potential goal of an attacker might be to read the contents of files from the server. For example, following two commands list the contents of the current directory and parent directory respectively:
                        </p>
                        <p>
                            <pre>res.end(require('fs').readdirSync('.').toString())</pre>
                            <pre>res.end(require('fs').readdirSync('..').toString()) </pre>
                        </p>
                        <p>
                            Once file names are obtained, an attacker can issue the command below to view the actual contents of a file:
                        </p>
                        <p>
                            <pre>res.end(require('fs').readFileSync(filename))</pre>
                        </p>
                        <p>
                            An attacker can further exploit this vulnerability by writing and executing harmful binary files using
                            <code>fs</code>and
                            <code>child_process</code>modules.
                        </p>
                        </p>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">How Do I Prevent It?</h3>
                    </div>
                    <div class="panel-body">
                        To prevent server-side js injection attacks:
                        <ul>
                            <li>Validate user inputs on server side before processing</li>
                            <li>Do not use
                                <code>eval()</code>function to parse user inputs. Avoid using other commands with similar effect, such as
                                <code>setTimeOut()</code>,
                                <code>setInterval()</code>, and
                                <code>Function()</code>.
                            </li>
                            <li>
                                For parsing JSON input, instead of using
                                <code>eval()</code>, use a safer alternative such as
                                <code>JSON.parse()</code>. For type conversions use type related
                                <code>parseXXX()</code>methods.
                            </li>
                            <li>Include
                                <code>"use strict"</code>at the beginning of a function, which enables <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode"> strict mode </a>within the enclosing function scope.</li>

                        </ul>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Source Code Example</h3>
                    </div>
                    <div class="panel-body">
                        <p>In
                            <code>routes/contributions.js</code>, the
                            <code>handleContributionsUpdate()</code>function insecurely uses
                            <code>eval()</code>to convert user supplied contribution amounts to integer.
                            <pre>
        // Insecure use of eval() to parse inputs
        var preTax = eval(req.body.preTax);
        var afterTax = eval(req.body.afterTax);
        var roth = eval(req.body.roth);
                            </pre> This makes application vulnerable to SSJS attack. It can fixed simply by using
                            <code>parseInt()</code>instead.
                            <pre>
        //Fix for A1 -1 SSJS Injection attacks - uses alternate method to eval
        var preTax = parseInt(req.body.preTax);
        var afterTax = parseInt(req.body.afterTax);
        var roth = parseInt(req.body.roth);
                            </pre>
                        </p>
                        <p>In addition, all functions begin with
                            <code>use strict</code>pragma.
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Further Reading</h3>
                    </div>
                    <div class="panel-body">
                        <ul>
                            <li><a target="_blank" href="https://media.blackhat.com/bh-us-11/Sullivan/BH_US_11_Sullivan_Server_Side_WP.pdf">“ServerSide JavaScript Injection: Attacking NoSQL and Node.js"</a> a whitepaper by Bryan Sullivan.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /ssjs -->

    <!-- DB Injection -->
    <div class="panel panel-info">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                    <i class="fa fa-chevron-down"></i> A1 - 2 SQL and NoSQL Injection
                </a>
            </h4>
        </div>
        <div id="collapseTwo" class="panel-collapse">
            <div class="panel-body">


                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Description</h3>
                    </div>
                    <div class="panel-body">
                        <p>
                            SQL and NoSQL injections enable an attacker to inject code into the query that would be executed by the database. These flaws are introduced when software developers create dynamic database queries that include user supplied input.
                        </p>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Attack Mechanics</h3>
                    </div>
                    <div class="panel-body">
                        <p>Both SQL and NoSQL databases are vulnerable to injection attack. Here is an example of equivalent attack in both cases, where attacker manages to retrieve admin user's record without knowing password:</p>
                        <h5>1. SQL Injection</h5>
                        <p>Lets consider an example SQL statement used to authenticate the user with username and password</p>
                        <pre>SELECT * FROM accounts WHERE username = '$username' AND password = '$password'</pre>
                        <p>If this statement is not prepared or properly handled when constructed, an attacker may be able to supply
                            <code>admin' --</code>in the username field to access the admin user's account bypassing the condition that checks for the password. The resultant SQL query would looks like:</p>
                        <pre>SELECT * FROM accounts WHERE username = 'admin' -- AND password = ''</pre>
                        <br/>
                        <h5>2. NoSQL Injection</h5>
                        <p>The equivalent of above query for NoSQL MongoDB database is:</p>
                        <pre>db.accounts.find({username: username, password: password});</pre>
                        <p>While here we are no longer dealing with query language, an attacker can still achieve the same results as SQL injection by supplying JSON input object as below:</p>
                        <pre>
{
    "username": "admin",
    "password": {$gt: ""}
}
                        </pre>
                        <p>In MongoDB,
                            <code>$gt</code>selects those documents where the value of the field is greater than (i.e. >) the specified value. Thus above statement compares password in database with empty string for greatness, which returns
                            <code>true</code>.</p>
                        <p>The same results can be achieved using other comparison operator such as
                            <code>$ne</code>.</p>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">SSJS Attack Mechanics</h3>
                    </div>
                    <div class="panel-body">
                        <p>
                            Server-side JavaScript Injection (SSJS) is an attack where JavaScript code is injected and executed in a server component. MongoDB specifically, is vulnerable to this attack when queries are run without proper sanitization.
                        </p>

                        <h5>$where operator</h5>
                        <p>
                            MongoDB's
                            <code>$where</code> operator performs JavaScript expression evaluation on the MongoDB server. If the user is able to inject direct code into such queries then such an attack can take place
                        </p>

                        <p>
                            Lets consider an example query:
                        </p>
                        <pre> db.allocationsCollection.find({ $where: "this.userId == '" + parsedUserId + "' && " + "this.stocks > " + "'" + threshold + "'" }); </pre>

                        <p>
                            The code will match all documents which have a
                            <code>userId</code> field as specified by
                            <code>parsedUserId</code> and a
                            <code>stocks</code> field as specified by
                            <code>threshold</code>. The problem is that these parameters are not validated, filtered, or sanitised, and vulnerable to SSJS Injection.
                        </p>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">How Do I Prevent It?</h3>
                    </div>
                    <div class="panel-body">
                        Here are some measures to prevent SQL / NoSQL injection attacks, or minimize impact if it happens:
                        <ul>
                            <li>Prepared Statements: For SQL calls, use prepared statements instead of building dynamic queries using string concatenation.</li>
                            <li>Input Validation: Validate inputs to detect malicious values. For NoSQL databases, also validate input types against expected types</li>
                            <li>Least Privilege: To minimize the potential damage of a successful injection attack, do not assign DBA or admin type access rights to your application accounts. Similarly minimize the privileges of the operating system account that the database process runs under.</li>
                        </ul>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Source Code Example</h3>
                    </div>
                    <div class="panel-body">
                        <p><strong>Note: These vulnerabilities are not present when using an Atlas M0 cluster with NodeGoat.</strong></p>
                        <p>The Allocations page of the demo application is vulnerable to NoSQL Injection. For example, set the stocks threshold filter to:</p>
                        <pre>1'; return 1 == '1</pre>
                        <p>This will retrieve allocations for all the users in the database.</p>
                        <p>An attacker could also send the following input for the
                            <code>threshold</code> field in the request's query, which will create a valid JavaScript expression and satisfy the
                            <code> $where</code> query as well, resulting in a DoS attack on the MongoDB server:
                        </p>
                        <pre>http://localhost:4000/allocations/2?threshold=5';while(true){};' </pre>
                        <p>
                            You can also just drop the following into the Stocks Threshold input box:
                        </p>
                        <pre>';while(true){};'</pre>
                        <p>For these vulnerabilities, bare minimum fixes can be found in
                        <code>allocations.html</code> and
                        <code>allocations-dao.js</code></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /NoSQL Injection -->

    <!-- Log Injection -->
    <div class="panel panel-info">
        <div class="panel-heading">
            <h4 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                    <i class="fa fa-chevron-down"></i> A1 - 3 Log Injection
                </a>
            </h4>
        </div>
        <div id="collapseThree" class="panel-collapse">
            <div class="panel-body">


                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Description</h3>
                    </div>
                    <div class="panel-body">
                        <p>
                            Log injection vulnerabilities enable an attacker to forge and tamper with an application's logs.
                        </p>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Attack Mechanics</h3>
                    </div>
                    <div class="panel-body">
                        <p>An attacker may craft a malicious request that may deliberately fail, which the application will log, and when attacker's user input is unsanitized, the payload is sent as-is to the logging facility. Vulnerabilities may vary depending on the logging facility:</p>
                        <h5>1. Log Forging (CRLF) </h5>
                        <p>Lets consider an example where an application logs a failed attempt to login to the system. A very common example for this is as follows:
                        </p>
                        <pre>
var userName = req.body.userName;
console.log('Error: attempt to login with invalid user: ', userName);
                        </pre>
                        <p>When user input is unsanitized and the output mechanism is an ordinary terminal stdout facility then the application will be vulnerable to CRLF injection, where an attacker can create a malicious payload as follows:
                        <pre>
curl http://localhost:4000/login -X POST --data 'userName=vyva%0aError: alex moldovan failed $1,000,000 transaction&password=Admin_123&_csrf='
                        </pre>
                        Where the <code>userName</code> parameter is encoding in the request the LF symbol which will result in a new line to begin. Resulting log output will look as follows:
                        <pre>
Error: attempt to login with invalid user:  vyva
Error: alex moldovan failed $1,000,000 transaction
                        </pre>
                        <br/>
                        <h5>2. Log Injection Escalation </h5>
                        <p>
                            An attacker may craft malicious input in hope of an escalated attack where the target isn't the logs themselves, but rather the actual logging system. For example, if an application has a back-office web app that manages viewing and tracking the logs, then an attacker may send an XSS payload into the log, which may not result in log forging on the log itself, but when viewed by a system administrator on the log viewing web app then it may compromise it and result in XSS injection that if the logs app is vulnerable.
                        </p>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">How Do I Prevent It?</h3>
                    </div>
                    <div class="panel-body">

                        As always when dealing with user input:
                        <ul>
                            <li>
                                Do not allow user input into logs
                            </li>
                            <li>
                                Encode to proper context, or sanitize user input
                            </li>
                        </ul>

                        Encoding example:
                        <pre>
// Step 1: Require a module that supports encoding
var ESAPI = require('node-esapi');
// - Step 2: Encode the user input that will be logged in the correct context
// following are a few examples:
console.log('Error: attempt to login with invalid user: %s', ESAPI.encoder().encodeForHTML(userName));
console.log('Error: attempt to login with invalid user: %s', ESAPI.encoder().encodeForJavaScript(userName));
console.log('Error: attempt to login with invalid user: %s', ESAPI.encoder().encodeForURL(userName));
                        </pre>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Source Code Example</h3>
                    </div>
                    <div class="panel-body">
                        <p>For the above Log Injection vulnerability, example and fix can be found at
                        <code>routes/session.js</code></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /Log Injection -->

</div>
<!-- end accordions -->
{% endblock %}
