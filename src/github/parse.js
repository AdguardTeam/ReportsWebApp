const extractDomain = require('../utils/parse-url.js').extractDomain;


function getCandidates(ar) {
    let candidates = [];
    let temp = Object.create(null);
    ar.forEach(function(segment) {
        let domain = extractDomain(segment);
        if(domain) {
            if(temp[domain]) {
                candidates[temp[domain]].occurence++;
            }
            else {
                temp[domain] = candidates.push({
                    occurence: 0,
                    domain: domain
                }) - 1;
            }
        }
    });
    candidates.sort(function(a, b) {
        return b.occurence - a.occurence;
    });
    return candidates[0] !== undefined ? candidates[0].domain : null;
}

function tryParsingFromTitle(title) {
    let ar = title.split(/[\s\-]/);
    let candidates = getCandidates(ar);
    return candidates;
}

function tryParsingFromBody(body) {
    body = body.slice(body.indexOf('***Site***') + 10);
    let i = body.search(/\r\n/);
    body = body.slice(0, i);
    let ar = body.split(/[\s\-]/);
    let candidates = getCandidates(ar);
    return candidates;
}

function parseDomain(issue) {
    return tryParsingFromTitle(issue.title) ||  tryParsingFromBody(issue.body) || null;
}


function parseType(issue) {
    let labelNames = issue.labels.map((el) => el.name);
    if(labelNames.indexOf("Ads") > -1) return 0; //Ads
    if(labelNames.indexOf("Ad Leftover") > -1) return 0;
    if(labelNames.indexOf("Incorrect Blocking") > -1) return 1; //false positive
    if(labelNames.indexOf("Social Widget") > -1) return 2; // Social
    if(labelNames.indexOf("Anti Adblock Script") > -1) return 4; //Anti-Adblock
    if(labelNames.indexOf("Annoyance") > -1) return 3;
    return null;
}


function parseDesc(issue) {
    let body = issue.body;
    body = body.replace(/\[\/\/\][\s\S]*?\r\n/g, ""); // remove invisible lines
    body = body.trim();
    let i = body.indexOf("***Description***");
    if(i != -1) {
        body = body.slice(i + 37);
        body = body.slice(0, body.indexOf("**"));
    }
    else {
        i = body.indexOf("***");
        if(i != -1) {
            body = body.slice(0, i);
        }
    }
    return body.slice(0, 40);
}

function makeBody(desc) {
    return '';
}


module.exports = {
    parseDomain: parseDomain,
    parseType: parseType,
    parseDesc: parseDesc,
    makeBody: makeBody
};
