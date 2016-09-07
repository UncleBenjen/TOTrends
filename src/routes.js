import React from 'react'
import { Route, IndexRoute } from 'react-router'

/* container components */
import Skeleton from './components/Skeleton'
import TrendListConnector from './connectors/TrendList'
import TweetSearchConnector from './connectors/TweetSearch'

const routes = (
  <Route path="/" component={Skeleton}>
	<IndexRoute component={TrendListConnector} />
	<Route path="search" component={TweetSearchConnector} />
  </Route>
)

export default routes
