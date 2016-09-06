const constants = require('../constants');

const initialState = []

function update(state = initialState, action) {

	switch (action.type) {
		case constants.RECEIVE_TWEET:
			return [action.data.tweet, ...state]

		case constants.REMOVE_TWEET:
			let index = null
			//state.filter((val, i)=>{ if( val.id === action.data.id ) { index = i } })
			return [ ...state.slice(0, action.data.id), ...state.slice(action.data.id+1) ]
		
		default:
			return state
  }
}

module.exports = update;
