const express = require('express');

const bodyParser = require("body-parser");
const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const config = require("./webpack.config.js");

const app = express();

const github = require('./src/github');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'development'){
    console.log("using dev server..");
    app.use(webpackMiddleware(webpack(config), {
        publicPath: "/",
        filename: 'bundle.js',
        stats: {
            colors: true,
        }
    }));
}

app.use(express.static('docs'));


app.post('/search.json', function(req, res){
    let domain = req.body.domain;
    let type = req.body.type;
    if(domain === undefined || type === undefined) {
        res.json({error: "Invalid input"});
    }
    github.searchIssues(domain, type).then(function(results){
        res.json(results.map((result) => ({
            status: result.status,
            url: result.url,
            title: result.title,
            date: result.last_update,
            desc: result.desc
        })));
    });
});

github.init();

app.listen(3000, () => {
  console.log('App running at port 3000');
});
