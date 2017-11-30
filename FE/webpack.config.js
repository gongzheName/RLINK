var webpack = require("webpack");

var optimist = require("optimist");

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
        }]
    },
    devServer:{
        /*proxy: {
            "*": {
                target: "http://localhost:8086"
            }
        },*/
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: port,
        stats: { colors: true }
    }
}



