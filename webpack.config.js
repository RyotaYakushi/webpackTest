const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { runInNewContext } = require("vm");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { SourceMap } = require("module");

module.exports = {
  mode: "development",

  devtool: "source-map",
  entry: "./src/js/bundle.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./js/[name]-[contenthash].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: ">0.25% , not dead" }],
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg)/,
        type: "asset/resource",
        generator: {
          filename: "images/[name]-[contanthash] [ext]",
        },
        use: [
          ////{
          // loader: "file-loader",
          // options: {
          //   esModule: false,
          //   name: "images/[name].[ext]",
          // },
          ////},
          {
            loader: "image-webpack-loader",
            options: {
              pretty: true,
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
            },
          },
        ],
      },
      //  {
      // test: /\.pug/,
      // use: [
      //   {
      //     loader: "html-loader",
      //   },
      //   {
      //     loader: "pug-html-loader",
      //     options: {
      //       pretty: true,
      //     },
      //   },
      // ],
      //},
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name]-[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.html",
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};
