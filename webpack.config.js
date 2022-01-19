const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { runInNewContext } = require("vm");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { SourceMap } = require("module");
const globule = require("globule");
const loader = require("sass-loader");

const app = {
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
        test: /\.js$/,
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          { loader: "postcss-loader" },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
            },
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
      filename: "./css/style.css",
    }),
    //new HtmlWebpackPlugin({
    //   template: "./src/templates/index.html",
    //   filename: "index.html",
    // }),//
    new CleanWebpackPlugin(),
  ],
};
// htmlファイルを見つけて配列化
const templates = globule.find("./src/templates/**/*.html");
//htmlファイルごとにループさせる
templates.forEach((template) => {
  const fileName = template.replace("./src/templates/", "");
  app.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${fileName}`,
      template: template,
      inject: false, //false, head, body, trueから選べる
      minify: false, //本番環境でも圧縮しない
    })
  );
});
module.exports = app;
