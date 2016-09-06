import React from 'react'
import { Route, IndexRoute } from 'react-router'

/* container components */
import Skeleton from './components/Skeleton'

import TrendListConnector from './connectors/TrendList'
/*
import StreamConnector from './connectors/Stream'
<Route path="stream" component={StreamConnector} />
*/
import TweetSearch from './components/TweetSearch'

const routes = (
  <Route path="/" component={Skeleton}>
	<IndexRoute component={TrendListConnector} />
	<Route path="search" component={TweetSearch} />
	
  </Route>
)

export default routes
