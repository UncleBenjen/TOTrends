import React, {Component} from 'react'
import styles from './style.css'

import { isEmpty } from '../../utils'

import Tweet from '../Tweet'

import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import CircularProgress from 'material-ui/CircularProgress'

class TweetSearchResults extends Component {
    constructor (props) {
    	super(props) 
    }

    getMoreTweets(){
      this.props.fetchTweets(location.origin, this.props.trend, this.props.max_id)
    }

  	render (){
      let tweets = []

      if( !isEmpty(this.props.tweets) ){
        tweets = this.props.tweets.map((t, i) => {
          return(<Tweet key={t.id_str}  tweet={t} expanded={(this.props.selected === t.id_str)} onClick={this.props.selectTweet} /> )
        })
      }
              
  		return (
        <div className={styles.TweetSearchResultsContainer}>

          { this.props.err_msg ? <div>{this.props.err_msg}</div> : tweets }
          { this.props.loading ? <CircularProgress style={{ alignSelf:'center', margin:'28px' }} size={0.50}/> : <FlatButton style={{ alignSelf:'center', margin:'8px' }} secondary={true} label="More" onTouchTap={this.getMoreTweets.bind(this)} />}
        </div>
  		)
  	}

}

export default TweetSearchResults