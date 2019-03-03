var ResearchDAO = require("../data/research-dao").ResearchDAO;
var needle = require('needle');

function ResearchHandler(db) {
    "use strict";

    var researchDAO = new ResearchDAO(db);

    this.displayResearch = function(req, res, next) {
        
        if (req.query.symbol) {
            var url = req.query.url+req.query.symbol; 
            needle.get(url, function(error, newResponse) {
                if (!error && newResponse.statusCode == 200)
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write('<h1>The following is the stock information you requested.</h1>\n\n');
                    res.write('\n\n');
                    res.write(newResponse.body);
                    return res.end();
            });
        } else return res.render("research");
    };

}

module.exports = ResearchHandler;
