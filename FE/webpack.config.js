var webpack = require("webpack");

var optimist = require("optimist");

// 代理
var proxy = require('http-proxy-middleware');

var argv = optimist.argv;

var port = argv.port || 8080;

module.exports = {
    entry: "./src/app.js",
    output: {
        path: __dirname+"/build",
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                plugins: ["transform-runtime"],
                presets: ["es2015", "react", "stage-2"]
            }
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        }, {
            test: /\.scss$/,
            loader: "style-loader!css-loader!sass-loader"
        }]
    }
    ,devServer:{
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: { colors: true },
        proxy: {
            "/api": {
                target: "http://127.0.0.1:80",
                //pathRewrite: {'^/cross_domain/php' : '/cross_domain/php'},
                changeOrigin: true,
                secure: false
            }
        }
    }
    /*,devServer: {
        host: 'localhost',
        port: '8888',
        proxy: [
            {
                context: ["/upload", "/rl/index"],
                target: 'http://localhost:80',
                secure: false
            }
        ]
    }*/
}



