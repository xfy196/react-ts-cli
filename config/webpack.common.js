const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
console.log(process.env)
module.exports = {
  entry: {
    "scripts/index": path.resolve(__dirname, "../src/index.tsx"),
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: "[name]-[chunkHash].js"
  },
  module: {
    rules: [
      {

        test: /\.(jsx|js|ts|tsx)?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              "react-app"
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
            ]
          }
        }
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader"
          },
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|ttf)$/,
        use:
          [
            {
              loader: "url-loader",
              options: {
                limit: 8192,
                name: '[name]-[hash:6].[ext]',
                outputPath: "images/"
              }
            },
          ]
      },
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/components"),
      "api": path.resolve(__dirname, "../src/api"),
      "assets": path.resolve(__dirname, "../src/assets/"),
      "layouts": path.resolve(__dirname, "../src/layouts/"),
      "application": path.resolve(__dirname, "../src/application/"),
      "baseUI": path.resolve(__dirname, "../src/baseUI/"),
      "utils": path.resolve(__dirname, "../src/utils/")
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".css"]
  },
  plugins: [
    new MiniCssExtractPlugin({
      moduleFilename: ({ name }) => {
        return `${name.replace('scripts', 'styles')}-[hash:6].css`
      },
    }),
    new HtmlWebpackPlugin({
      title: "index",
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html"
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
}