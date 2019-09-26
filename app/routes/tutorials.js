function TutorialsHandler() {
    "use strict";

    this.displayA1 = function(req, res, next) {
        return res.render("tutorial/layout", {
            title: 'A1 - Injection',
            content: 'a1',
            subtitle: ''
        });
    };

    this.getTitle = function(page) {
        switch(page) {
            case 'a1':
                return 'A1 - Injection';
            case 'a2':
                return 'A2 - Broken Authentication and Session Management';
            case 'a3':
                return 'A3 - Cross-Site Scripting (XSS)';
            case 'a4':
                return 'A4 - Insecure Direct Object References';
            case 'a5':
                return 'A5 - Security Misconfiguration';
            case 'a6':
                return 'A6 - Sensitive Data Exposure';
            case 'a7':
                return 'A7 - Missing Function Level Access Control';
            case 'a8':
                return 'A8 - Cross-Site Request Forgery (CSRF)';
            case 'a9':
                return 'A9 - Using Components with Known Vulnerabilities';
            case 'a10':
                return 'A10 - Unvalidated Redirects and Forwards';
            case 'redos':
                return 'ReDoS Regular Expressions DoS';
            case 'ssrf':
                return 'Server-Side Request Forgery (SSRF)';            
        }
    }
}

module.exports = TutorialsHandler;
