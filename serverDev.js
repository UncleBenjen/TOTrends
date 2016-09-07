import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from './webpack.config.dev'

const app = express();

/* api endpoints */
const trends = require('./src/api/routes/trends')
app.use('/api/trends', trends)

const tweets = require('./src/api/routes/tweets')
app.use('/api/tweets', tweets)

app.use(webpackDevMiddleware(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true }
}));

app.use('/public', express.static(__dirname + '/public'))


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var PORT = process.env.PORT || 5000
var PRIVATE_IP_ADDRESS = process.env.PRIVATE_IP_ADDRESS || 'localhost'

var server = app.listen(PORT, PRIVATE_IP_ADDRESS, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listening on '+ PRIVATE_IP_ADDRESS + ':'+ PORT)
})
