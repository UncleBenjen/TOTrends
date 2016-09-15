import { LOCATION_CHANGE } from 'react-router-redux'

const constants = require('../constants');

const initialState = { tweets: [], loading: false, max_id: null, selected: null, err_msg: null }

function update(state = initialState, action) {

	switch (action.type) {
		case LOCATION_CHANGE:
			return Object.assign({}, state, { tweets: [], loading: false, max_id: null, selected: null })

		case constants.FETCH_TWEETS:
			return Object.assign({}, state, { loading: true })

		case constants.RECEIVE_TWEETS:
			if(action.payload.length > 0){
				if(state.max_id){
					return Object.assign({}, state, { loading: false, tweets: [...state.tweets, ...action.payload.slice(1, action.payload.length)], max_id: action.payload[action.payload.length - 1].id_str, err_msg:null })
				}
				else{
					return Object.assign({}, state, { loading: false, tweets: [...state.tweets, ...action.payload.slice(0, action.payload.length)], max_id: action.payload[action.payload.length - 1].id_str, err_msg:null })
				}
				
			}
			else{
				return state
			}

		case constants.FETCH_TWEETS_FAILED:
			return Object.assign({}, state, { err_msg: action.payload, loading: false })

		case constants.SELECT_TWEET:
			return Object.assign({}, state, { selected: action.payload })

		case constants.CHANGE_FILTER: 
			return Object.assign({}, state, { tweets: [], max_id: null, selected: null })
			
		default:
			return state
  }
}

module.exports = update;
