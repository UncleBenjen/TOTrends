import constants from '../../constants'
import { receiveTweet } from '../../actions/streaming'

import twitter from './twitter'

export default function(io, app){
	try{
		var twitterStream = twitter.stream('statuses/filter', { track:'Toronto,T.O.', locations: '-79.116,43.581,-78.639,43.855' });
		
		twitterStream.on('data', function(data) {
		  io.to('stream').volatile.emit('action', receiveTweet(data))
		});

		twitterStream.on('error', function(error) {
		  throw error;
		});
	}
	catch(e){
		console.log(e)
	}

	io.on('connection', function(socket){
		//console.log(socket.id + ' has connected.')

		socket.on('disconnect', function(){ 
			//console.log(socket.id + ' has disconnected.')
		})

		socket.on('action', (action) => {
			if(action.type === constants.SERVER_START_STREAM){
				socket.join('stream');
			}
			else if(action.type === constants.SERVER_STOP_STREAM){
				socket.leave('stream')
			}
		});
	})


}