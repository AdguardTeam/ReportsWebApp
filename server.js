const express = require('express');

const webpackMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const config = require("./webpack.config.js");

const app = express();

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

app.listen(3000, () => {
  console.log('App running at port 3000');
});
