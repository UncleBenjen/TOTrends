const constants = require('../constants');

const initialState = false

function update(state = initialState, action) {

	switch (action.type) {
		case constants.SERVER_START_STREAM:
			return true

		case constants.SERVER_STOP_STREAM:
			return false

		default:
			return state
  }
}

module.exports = update;
