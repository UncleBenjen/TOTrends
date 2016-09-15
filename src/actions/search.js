require('es6-promise').polyfill();
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
      if(max_id){
        endpoint += ('&count=' + (filters.count + 1))
      }
      else{
        endpoint += ('&count=' + filters.count)        
      }

    }
    if(filters.radius){
      endpoint += ('&radius=' + filters.radius)
    }
    if(filters.before){
      endpoint += ('&until=' + filters.before)
    }
    //console.log(endpoint)
    return fetch( endpoint )
      .then( (res) => {
        if(res.status === 204)
        {
          throw new Error('No tweets were found.')
        }
        else{
          return res.json()
        } 
      } ) 
      .then( json => dispatch(receiveTweets(json)) )
      .catch( (e) => {
        dispatch(fetchTweetsFailed('No tweets were found! Please try again with a different filter.'))
        console.log(e)
      })
  }
}

function fetchTweetsFailed(reason){
  return {
    type: constants.FETCH_TWEETS_FAILED,
    payload: reason
  }
}

function receiveTweets(json) {
  return {
    type: constants.RECEIVE_TWEETS,
    payload: json
  }
}

function selectTweet(tweetId){
  return {
    type: constants.SELECT_TWEET,
    payload: tweetId
  }
}

module.exports = { fetchTweets, fetchTweetsFailed, receiveTweets, selectTweet }
