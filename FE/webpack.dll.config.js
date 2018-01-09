const webpack = require("webpack")
const library = '[name]_lib'
const path = require("path")

module.exports = {
    entry: {
        vendors: ["react"]
    },
    output: {
        filename: "[name].dll.js",
        path: __dirname+"/build/",
        library
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "build/[name]-manifest.json"),
            name: library
        })
    ]
}








