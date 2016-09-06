
import constants from '../constants'

function startStream() {

	return {
		type: constants.SERVER_START_STREAM,
		receivedAt: Date.now()
	}
}
function stopStream() {

	return {
		type: constants.SERVER_STOP_STREAM,
		receivedAt: Date.now()
	}
}
function receiveTweet(tweet){
	
	return {
		type: constants.RECEIVE_TWEET,
		data: { tweet: tweet },
		receivedAt: Date.now()
	}
}
function removeTweet(id){
	console.log(id)
	return{
		type: constants.REMOVE_TWEET,
		data: { id: id },
		receivedAt: Date.now()
	}
}

module.exports = { startStream, stopStream, receiveTweet, removeTweet }
