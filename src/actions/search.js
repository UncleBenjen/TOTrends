import fetch from 'isomorphic-fetch'

const constants = require('../constants')

function fetchTweets(url, trend, max_id=null) {
  return (dispatch, getState) => {
    dispatch({ type: constants.FETCH_TWEETS })
    const filters = getState().filters

    var endpoint = url + '/api/tweets?trend=' + encodeURIComponent(trend)
    
    if(max_id){
      endpoint += ('&max_id=' + max_id)
    }
    if(filters.result_type){
      endpoint += ('&result_type=' + filters.result_type)
    }
    if(filters.count){
      endpoint += ('&count=' + filters.count)
    }
    if(filters.radius){
      endpoint += ('&radius=' + filters.radius)
    }
    if(filters.before){
      endpoint += ('&until=' + filters.before)
    }
    //console.log(endpoint)
    return fetch( endpoint )
      .then( req => req.json() ) 
      .then( json => dispatch(receiveTweets(json)) )
  }
}

function receiveTweets(json) {
  return {
    type: constants.RECEIVE_TWEETS,
    json: json,
    receivedAt: Date.now()
  }
}

function selectTweet(tweetId){
  return {
    type: constants.SELECT_TWEET,
    json: { id: tweetId },
    receivedAt: Date.now()
  }
}

module.exports = { fetchTweets, receiveTweets, selectTweet }
