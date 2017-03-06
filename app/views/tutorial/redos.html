{% extends "./layout.html" %} {% block title %}ReDoS Regular Expressions DoS{% endblock %} {% block content %}
<div class="row">
    <div class="col-lg-12">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">Description</h3>
            </div>
            <div class="panel-body">
                The Regular expression Denial of Service (<a href="https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS">ReDoS</a>) is a Denial of Service attack, that exploits the fact that most Regular Expression implementations may reach extreme situations that cause them to work very slowly (exponentially related to input size). An attacker can then cause a program using a Regular Expression to enter these extreme situations and then hang for a very long time.
            </div>
        </div>

        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">Attack Mechanics</h3>
            </div>
            <div class="panel-body">
                <p>
                    When untrusted data input is executed on a regex pattern, it may exploit vulnerable patterns into running long calculations to match for a given string. For Node.js this is extremely important due to the single-threaded event-loop architecture which means that the main Node.js process is blocked from serving any other requests.
                </p>
            </div>
        </div>
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">How Do I Prevent It?</h3>
            </div>
            <div class="panel-body">
                <ol>
                    <li>
                        Avoid writing your own regular expressions
                    </li>
                    <li>
                        Use Node.js's <a href="https://github.com/chriso/validator.js/">validator.js</a> package to validate expected data format instead of writing your own regular expressions
                    </li>
                    <li>
                        As a last resort of writing your own regex patterns you can utilize Node.js's
                        <a href="https://github.com/substack/safe-regex">safe-regex</a> package which allows detecting if a regex is prone to catastrophic backtracking, and also allows to configure threshold for maximum repetitions.
                    </li>
                </ol>
            </div>
        </div>
    </div>
    <div class="panel panel-info">
        <div class="panel-heading">
            <h3 class="panel-title">Source Code Example</h3>
        </div>
        <div class="panel-body">
            <p>
                Even simple regex patterns are vulnerable to ReDoS. The NodeGoat project uses the following source code to validate text format from the user based on a regex pattern:

                <pre>
// Allow only numbers with a suffix of #, for example: 'XXXXXX#'
var regexPattern = /([0-9]+)+\#/;
var testComplyWithRequirements = regexPattern.test(bankRouting)
                </pre> If a long enough input is provided it will stall the Node.js process and render it useless (in the background the Node.js process will take 100% cpu until stopped or the regex yields a result (true or false)). Try to input the following string in the Bank Routing number in the Profile form:
                <pre>
91762612117612121123123123123121
                </pre>

            </p>
        </div>
    </div>
</div>
</div>{% endblock %}