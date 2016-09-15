const constants = require('../constants')

import { fetchTweets } from './search'

function toggleFilters(){
  return {
    type: constants.TOGGLE_FILTERS,
    receivedAt: Date.now()
  }
}

function changeFilter(filter, value){
  return {
    type: constants.CHANGE_FILTER,
    payload: { filter: filter, value: value },
    receivedAt: Date.now()
  }
}

function changeFilterAndFetchTweets(filter, value, url, trend, max_id=null){
	return (dispatch, getState) => {
		dispatch(changeFilter(filter, value))
		dispatch(fetchTweets(url, trend, max_id))
	}

}

module.exports = { toggleFilters, changeFilter, changeFilterAndFetchTweets }
