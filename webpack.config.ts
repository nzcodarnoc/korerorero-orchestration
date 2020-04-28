const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require('nodemon-webpack-plugin'); 
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  entry: ["./src/index.ts"],
  output: {
    path: path.resolve('./dist'),
    filename: "server.js"
  },
  watch: process.env.IS_DEV === 'true',
  target: "node",
  externals: [
    nodeExternals()
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  mode: process.env.IS_DEV === 'true' ? "development" : "production",
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [new NodemonPlugin()],
};
