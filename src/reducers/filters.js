
const constants = require('../constants');

const initialState = { 
	showFilters: false, 
	count: '15', 
	result_type: 'recent',
	radius: '50', 
	before: null
}

function update(state = initialState, action) {

	switch (action.type) {
	
		case constants.TOGGLE_FILTERS:
			return Object.assign({}, state, { showFilters: !state.showFilters })

		case constants.CHANGE_FILTER:

			if(state[action.payload.filter]){

				let newValue = {}
				newValue[action.payload.filter] = action.payload.value
				return Object.assign({}, state, newValue)

			}
			else{
				return state
			}

		default:
			return state

  }
}

module.exports = update;
