{% extends "./layout.html" %} {% block title %}Server-Side Request Forgery (SSRF){% endblock %} {% block content %}

<div class="row">
    <div class="col-lg-12">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">Description</h3>
            </div>
            <div class="panel-body">In an SSRF attack, the attacker can abuse functionality on the server to read or update internal resources. The attacker can supply or modify a URL that the code running on the server will read or submit data to, and by carefully selecting the URLs, the attacker may be able to read server configuration such as AWS metadata, connect to internal services like HTTP-enabled databases or perform HTTP POST requests towards internal services which are not intended to be exposed.
            </div>
        </div>

        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">Attack Mechanics</h3>
            </div>
            <div class="panel-body">
                <p>An attacker can use an SSRF vulnerability as a way to gather information about the server and the local network.</p>

                <p>For example, on the "Research" page (
                    <code>/research</code>) in the application, a user submits a stock symbol. The stock symbol is concatenated to a Yahoo URL and the server fetches the response and displays the page.
                </p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/neClYWB05bQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <p>Here is a code snippet from
                    <code>routes/research.js</code>,
                    <pre>
    // If a stock symbol has been submitted, concatenate the symbol to the URL and return the HTTP Response
    if (req.query.symbol) {
        var url = req.query.url+req.query.symbol; 
        needle.get(url, function(error, newResponse) { ... }
                    </pre> An attacker can change the
                    <code>url</code> and <code>symbol</code> parameters to point to an attacker-controlled website to interact with the server.
                </p>
            </div>
        </div>
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">How Do I Prevent It?</h3>
            </div>
            <div class="panel-body">
                <p>To prevent SSRF vulnerabilities in web applications, it is recommended to adhere to the following guidelines:</p>
                <ol>
                    <li>Use a whitelist of allowed domains, resources and protocols from where the web server can fetch resources.</li>
                    <li>Any input accepted from the user should be validated and rejected if it does not match the positive specification expected.</li>
                    <li>If possible, do not accept user input in functions that control where the web server can fetch resources.</li>
                </ol>
            </div>
        </div>
    </div>
</div>{% endblock %}
