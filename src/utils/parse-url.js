const R_URL_DOMAIN_MATCH = require('../constants/regexes.js').R_URL_DOMAIN_MATCH;

module.exports = {
    extractDomain: function(url) {
        let match = R_URL_DOMAIN_MATCH.exec(url);
        if(match && match[1]) {
            return match[1].replace(/\.$/g, '');
        }
        else return false;
    }
};