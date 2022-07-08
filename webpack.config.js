const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "development",
  entry: {
    bundle: [
      path.resolve(__dirname, "src/index.js"),
      path.resolve(__dirname, "src/task.js"),
      path.resolve(__dirname, "src/list.js"),
      path.resolve(__dirname, "src/task-details.js"),
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    clean: true,
    // assetModuleFilename: "[name][ext]",
    assetModuleFilename: "[name][ext]",
  },
  devtool: "source-map",
  devServer: {
    static: { directory: path.resolve(__dirname, "dist") },
    port: 3001,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: { esModule: false },
          },
          "css-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ogg|mp3|wav)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "TodoList-Pure-Redux",
      filename: "index.html",
      template: "src/template.html",
    }),
    new MiniCssExtractPlugin({ filename: "style.css" }),
  ],
};
