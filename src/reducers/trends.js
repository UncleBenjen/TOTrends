const constants = require('../constants');

const initialState = { list: [], loading: false, }

function update(state = initialState, action) {

	switch (action.type) {
		case constants.FETCH_TRENDS:
			return Object.assign({}, state, { loading: true })

		case constants.RECEIVE_TRENDS:
			return Object.assign({}, state, { list: action.json, loading: false } )

		default:
			return state
  }
}

module.exports = update;
