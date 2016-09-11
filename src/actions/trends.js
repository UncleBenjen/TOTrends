require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'
const constants = require('../constants')

function fetchTrends(url, woeid = '4118') {
  return dispatch => {
    dispatch({ type: constants.FETCH_TRENDS })
    return fetch(url + '/api/trends?place=' + woeid)
      .then( req => req.json() )
      .then( json => dispatch(receiveTrends(json)) )
  }
}

function receiveTrends(json) {
  return {
    type: constants.RECEIVE_TRENDS,
    json: json,
    receivedAt: Date.now()
  }
}


module.exports = { fetchTrends, receiveTrends }
