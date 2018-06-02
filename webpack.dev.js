const merge = require("webpack-merge");
const { HotModuleReplacementPlugin, DefinePlugin } = require("webpack");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        host: "0.0.0.0",
        port: "3107",
        contentBase: "./dist",
        disableHostCheck: true,
        hot: true
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development")
        })
    ]
});
