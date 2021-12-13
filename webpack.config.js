const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { runInNewContext } = require("vm");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { SourceMap } = require("module");

module.exports = {
  devtool: "source-map",
  entry: "./src/js/bundle.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./js/bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg)/,
        type: "asset/resource",
        generator: {
          filename: "images/[name] [ext]",
        },
        use: [
          ////{
          // loader: "file-loader",
          // options: {
          //   esModule: false,
          //   name: "images/[name].[ext]",
          // },
          ////},
        ],
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/main.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.pug",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/acces.pug",
      filename: "acces.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/members/gorira.pug",
      filename: "members/gorira.html",
    }),
    new CleanWebpackPlugin(),
  ],
};
