const constants = require('../constants');

const initialState = { list: [], loading: false, }

function update(state = initialState, action) {

	switch (action.type) {
		case constants.FETCH_TRENDS:
			return Object.assign({}, state, { loading: true })

		case constants.RECEIVE_TRENDS:

			let list = [];
			/* parse the npm packages 
			action.json.comments.map(function (c, i) {
				list.push(
					{
						id: c.data.id,
						author: c.data.author,
						body: c.data.body_html,
						created: c.data.created,
						gilded: c.data.gilded,
						score:c.data.score,
						parent_thread:{
							id: c.data.link_id,
							url: c.data.link_url,
							author: c.data.link_author,
							title: c.data.link_title
						},
						parent_comment:{
							id: c.data.parent_id.split('_')[1],
							author: null,
							body: null,
							created: null,
							score: null
						},
						subreddit:{ 
							name: c.data.subreddit, 
							id: c.data.subreddit_id 
						}
					}
				)
			})*/
			console.log(action.json)

			return Object.assign({}, state, { list: list, loading: false } )
			
		default:
			return state
  }
}

module.exports = update;
