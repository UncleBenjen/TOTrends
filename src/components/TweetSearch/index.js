import React, {Component} from 'react'
import styles from './style.css'

import Divider from 'material-ui/Divider';

import TweetSearchFilterBar from '../../connectors/TweetSearchFilterBar'
import TweetSearchResults from '../../connectors/TweetSearchResults'

class TweetSearch extends Component {
    constructor (props) {
    	super(props)
    }

  	render (){
  		return (
  			<div className={styles.tweetSearchContainer}>
  				<TweetSearchFilterBar />
          <Divider />
          <TweetSearchResults />
       	</div>
  		)
  	}
}


export default TweetSearch