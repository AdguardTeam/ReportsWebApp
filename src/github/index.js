const GitHubApi = require("github");
const sqlite3 = require('sqlite3')//.verbose();
const Promise = require('bluebird');

const path = require('path');
const dbPath = path.resolve(__dirname, 'issues.db');

const parse = require('./parse.js');


const issuesDb = new sqlite3.Database(dbPath);

const github = new GitHubApi({
    debug: false,
    protocol: "https",
    host: "api.github.com",
    headers: {
        "user-agent": "Test-App-By-AdguardTeam"
    },
    Promise: Promise,
    followRedirects: false,
    timeout: 5000
});

const run = Promise.promisify(issuesDb.run.bind(issuesDb));
const get = Promise.promisify(issuesDb.get.bind(issuesDb));
const all = Promise.promisify(issuesDb.all.bind(issuesDb));
const getIssues = Promise.promisify(github.issues.getForRepo);


const githubApi = {
    init: () => {
        let createTable = run("CREATE TABLE IF NOT EXISTS issues (number INTEGER NOT NULL UNIQUE, domain TEXT, url TEXT, title TEXT, desc TEXT, last_update TEXT, status INTEGER, type INTEGER);");

        function insertIssue(issue) {
            let domain = parse.parseDomain(issue);
            let type = parse.parseType(issue);
            let config = [issue.number, domain, issue.html_url, issue.title, parse.parseDesc(issue), issue.updated_at, issue.status == "open" ? 1 : 0, type];
            return run("INSERT INTO issues VALUES (?, ?, ?, ?, ?, ?, ?, ?);", config);
        }

        function updateIssue(number, issue) {
            let domain = parseparseDomain(issue);
            let type = parseparseType(issue);
            return run("UPDATE issues SET domain=?, url=?, title=?, last_update=?, status=?, type=? WHERE number=? ;", [domain, issue.html_url, issue.title, parse.parseDesc(issue), issue.updated_at, issue.status == "open" ? 1 : 0, type, number]);
        }

        try{
            github.authenticate( Object.assign({}, {
                type: "basic"
            }, require('./credentials.js')));
            console.log('\x1b[33m', 'using GitHub api with authentication', '\x1b[0m');
        }
        catch(e) {
            console.log('\x1b[33m', 'no credentials provided, using GitHub api without authentication...', '\x1b[0m');
        }

        createTable.then(() => {
            get("SELECT min(number) AS minNum FROM issues;").then((result) => {
                let minNum, page;

                let fetchOnce = () => {
                    if(minNum <= 1) return Promise.resolve();
                    page++;
                    console.log("Fetching AdguardFilters issues page " + page);
                    return getIssues({
                        owner: "AdguardTeam",
                        repo: "AdguardFilters",
                        state: "all",
                        page: page,
                        per_page: 100
                    }).catch((err) => {
                        console.warn("\x1b[31m", "Error in connecting to the github api server. Check for rate limits.", '\x1b[0m');
                        console.warn(err);
                    }).then((res) => Promise.mapSeries(res.data, (issue, index) => (
                        issue.number >= minNum ? Promise.resolve() : insertIssue(issue).then(() => {minNum = issue.number;})
                    ))).catch((err) => {
                        console.warn("\x1b[31m", "Uncaught error in inserting a new row", '\x1b[0m');
                        console.warn(err);
                    }).then(fetchOnce);
                };


                if(!result || !result.minNum) {
                    page = 0; // page starts with 1
                    return fetchOnce();
                }

                if(result.minNum != 1) {
                    minNum = result.minNum;
                    return getIssues({
                        owner: "AdguardTeam",
                        repo: "AdguardFilters",
                        state: "all",
                        per_page: 1
                    }).then((result) => {
                        page = Math.floor((result.data[0].number - minNum + 1) / 100);
                    }).then(fetchOnce);
                }

                return Promise.resolve();
            });
        });

        // Once initialized, we may listen to the repository events using https://developer.github.com/webhooks/
    },
    
    /**
     * Searches for existing issues with the same domain name (or app) and problem type.
     *
     * @returns Array of issues found
     */
    searchIssues: (domain, type) => {
        // Should match type as well
        if(domain.indexOf('www.') == 0) { // www.example.com should find issues of domain example.com or sub.www.example.com but not sub.example.com
            return all("SELECT * FROM issues WHERE domain LIKE ? OR domain = ? OR domain = ? ORDER BY date(last_update) DESC LIMIT 10 ;", ["%." + domain, domain, domain.slice(4)]);
        }
        return all("SELECT * FROM issues WHERE domain LIKE ? OR domain = ? ORDER BY date(last_update) DESC LIMIT 10 ;", ["%." + domain, domain]);
    },
    
    /**
      * Creates a Github issue
      *
      * @returns issue info
      */
    createIssue: (title, description, labels) => {
        github.issues.create({
            owner: 'AdguardTeam',
            repo: 'AdguardFilters',
            title: title,
            body: makeBody(description)
        });
    },
    
    /**
     * Adds a comment for the specified issue
     * We need it in case if there is an open issue about the very same problem.
     */
    addComment: (issueId, commentText) => {
        github.issues.createComment({
            owner: 'AdguardTeam',
            repo: 'AdguardFilters',
            number: issueId,
            body: commentText
        });
    }
}

module.exports = githubApi;
