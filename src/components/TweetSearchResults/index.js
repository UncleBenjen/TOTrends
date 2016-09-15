import React, {Component} from 'react'
import styles from './style.css'

import { isEmpty } from '../../utils'

import Tweet from '../Tweet'
import ExpandedTweet from '../ExpandedTweet'


import FlatButton from 'material-ui/FlatButton';
import {Card} from 'material-ui/Card';

import CircularProgress from 'material-ui/CircularProgress'

class TweetSearchResults extends Component {
    constructor (props) {
    	super(props) 
    }

    getMoreTweets(){
      this.props.fetchTweets(location.origin, this.props.trend, this.props.max_id)
    }

  	render (){
      let tweets = [[], null, []]

      if( !isEmpty(this.props.tweets) ){


        this.props.tweets.map((t, i) => {

          if(this.props.selected === t.id_str){
            tweets[1] = <ExpandedTweet  key={t.id_str}  tweet={t}  />
          }
          else{
            if(tweets[1]){
              tweets[2].push(<Tweet key={t.id_str}  tweet={t} onClick={this.props.selectTweet} />)
            }
            else{
              tweets[0].push(<Tweet key={t.id_str}  tweet={t} onClick={this.props.selectTweet} />)
            }
          }
          
        })

      }
              
  		return (
        <div className={styles.TweetSearchResultsContainer}>
          { this.props.err_msg ? <div>{this.props.err_msg}</div> : <div style={{width:'100%'}}>{ tweets[0].length > 0 ? <Card>{tweets[0]}</Card> : null } { tweets[1] ? tweets[1] : null } { tweets[2].length > 0 ? <Card>{tweets[2]}</Card> : null }</div> }
          { this.props.loading ? <CircularProgress style={{ alignSelf:'center', margin:'28px' }} size={0.50}/> : <FlatButton style={{ alignSelf:'center', margin:'8px' }} secondary={true} label="More" onTouchTap={this.getMoreTweets.bind(this)} />}
        </div>
  		)
  	}

}

export default TweetSearchResults