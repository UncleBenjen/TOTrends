import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from './webpack.config.dev'

const app = express();

/* api endpoints */
const trends = require('./src/api/routes/trends')
app.use('/api/trends', trends)

app.use(webpackDevMiddleware(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true }
}));

app.use('/public', express.static(__dirname + '/public'))


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(5000, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('listening on http://127.0.0.1:5000')
})
