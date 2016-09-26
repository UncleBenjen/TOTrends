require('es6-promise').polyfill();
import 'babel-polyfill'

import express from 'express'
import serialize from 'serialize-javascript'
import qs from 'qs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { configureStore } from './src/store'
import routes from './src/routes'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const app = express()
app.use('/public', express.static(__dirname + '/public'))

/* api endpoints */
const trends = require('./src/api/routes/trends')
app.use('/api/trends', trends)

const tweets = require('./src/api/routes/tweets')
app.use('/api/tweets', tweets)

/*      <link rel="icon" type="image/png" href="/public/favicon.ico" />*/

const HTML = ({ content, store }) => (
  <html>
    <head>
      <title>T.O. Trends</title>
      <meta name="description" content="Check out the top 50 trends in Toronto, to see what people in Toronto are actively Tweeting about." />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@bem_spur" />
      <meta name="twitter:title" content="T.O. Trends" />
      <meta name="twitter:description" content="Check out the top 50 trends in Toronto, to see what people in Toronto are actively Tweeting about." />
      <meta name="twitter:creator" content="@bem_spur" />
      <meta name="twitter:image" content="https://source.unsplash.com/uhezNiYWSVU/400x300" />

      <meta property="og:title" content="T.O. Trends" />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="http://www.totrends.ca/" />
      <meta property="og:image" content="https://source.unsplash.com/uhezNiYWSVU/400x300" />
      <meta property="og:description" content="Check out the top 50 trends in Toronto, to see what people in Toronto are actively Tweeting about." /> 
      <meta property="og:site_name" content="TO Trends" />

      <link rel='stylesheet' type='text/css' href='/public/style.css' />

      <link href="https://fonts.googleapis.com/css?family=Exo+2:900,900i%7CRoboto:300,400,500" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
      
    </head>
    <body>
      <div id='mount' dangerouslySetInnerHTML={{ __html: content }}/>
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }}/>
      <script src='/public/vendor.js' />
      <script src='/public/bundle.js' />
    </body>
  </html>
)

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import customTheme from './src/theme';

app.use(function (req, res, next) {
  //console.log(req.url)
 //console.log(req.query)

 // let initialState = { routing: { locationBeforeTransitions: { query: { q:'test' } } } }
  const memoryHistory = createMemoryHistory(req.url)
  let store = configureStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)


  /* react router match history */
  match({ history, routes , location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            return res.status(500).send(error);
        }

        if (redirectLocation) {
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }

        if (!renderProps) {
            return next();
        }

        //console.log(store.getState())

       // Create the redux store.
       // const store = createStore();

        let { query, params } = renderProps;

        let url = req.protocol + '://' + req.get('host')
        customTheme.userAgent = req.headers['user-agent'];

        // Retrieve the promises from React Router components that have a fetchData method.
        //  We use this data to populate our store for server side rendering.
        const fetchedData = renderProps.components
            .filter(component => component.fetchData)
            .map(component => component.fetchData({params, store, url}));

        // Wait until ALL promises are successful before rendering.
        Promise.all(fetchedData)
            .then(() => {
              const content = renderToString(
                <MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
                  <Provider store={store}>
                    <RouterContext {...renderProps}/>
                  </Provider>
                </MuiThemeProvider>
              )

              res.send('<!doctype html>\n' + renderToString(<HTML content={content} store={store}/>))
            })
            .catch((err) => {
                // TODO: Perform better error logging.
                console.log(err);
            });
  })

})

var PORT = process.env.PORT || 5000
var PRIVATE_IP_ADDRESS = process.env.PRIVATE_IP_ADDRESS || 'localhost'

var server = app.listen(PORT, PRIVATE_IP_ADDRESS, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('listening on '+ PRIVATE_IP_ADDRESS + ':'+ PORT)
})


