const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        javascript: __dirname + "/index.js",
    },
  module: {
      rules:
      [
        {
            test: /\.(ts|tsx)?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.(js|jsx)?$/,
            use:[
                {
                    loader: 'babel-loader',
                    options:{
                        presets: ['@babel/preset-env', "@babel/preset-react"],
                    }
                },
            ]
          },
          {
            test: /\.css$/,
            use: [
                {loader:"style-loader"},
                {
                    loader:"css-loader",
                    options: {
                        modules: true
                    }
                }
            ]
          }
      ]
  },
  resolve: { extensions: ["*", ".js", ".jsx", "ts", "tsx"] },
  output: {
    globalObject:"this",
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true,
    writeToDisk: false
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ]
};
