import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import { configureStore } from './src/store'
import routes from './src/routes'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import customTheme from './src/theme';

let state = window.__initialState__ || undefined
const store = configureStore(browserHistory, state)

const history = syncHistoryWithStore(browserHistory, store)

import { ReactGA } from 'react-ga'

if(process.env.GA_ID){
	ReactGA.initialize(GA_ID);
}

function registerPageView(){
	ReactGA.set({ page: window.location.pathname });
	ReactGA.pageview(window.location.pathname);		
}

function onPageUpdate(){
	window.scrollTo(0, 0); 
	if(process.env.GA_ID){
		registerPageView();
	}
}

render(
	<MuiThemeProvider muiTheme={getMuiTheme(customTheme)}>
	  <Provider store={store}>
	    <Router onUpdate={onPageUpdate} history={history} routes={routes} />
	  </Provider>
	</MuiThemeProvider>,
  	document.getElementById('mount')
)
