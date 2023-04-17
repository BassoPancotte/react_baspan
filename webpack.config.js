var prod;
var dashboard; process.env.DASHBOARD;
var baseUrl;

try { prod = process.env.NODE_ENV.replace(' ', '') === 'production'; } catch (error) { prod = false }
try { dashboard = process.env.DASHBOARD.replace(' ', ''); } catch (error) { dashboard = undefined }
try { baseUrl = process.env.PUBLIC_URL.replace(' ', ''); } catch (error) { baseUrl = './' }

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: `./src/dashboards/${dashboard}/${dashboard}.tsx`,
  output: {
    path: `${__dirname}/build/${dashboard}/`,
    publicPath: prod ? baseUrl : '/'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: `./src/dashboards/${dashboard}/${dashboard}.html`,
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    client: {
      progress: true,
    },
    open: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
};