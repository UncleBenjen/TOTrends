import React from 'react'
import { Route, IndexRoute } from 'react-router'

/* container components */
import App from './containers/App'
import TrendList from './containers/Trends/List'
import TrendStream from './containers/Trends/Stream'


const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={TrendList}/>
    <Route path="stream" component={TrendStream} />
  </Route>
)

export default routes
