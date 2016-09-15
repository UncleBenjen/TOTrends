import React, {Component} from 'react'
import styles from './style.css'

import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui/svg-icons/image/image'

class Tweet extends Component {

    constructor (props) {
      super(props)
    }

    handleClick(){
      console.log(this.props.tweet)
      //console.log(window.scrollY)
      //console.log(findDOMNode(document.body).scrollTop)
      //console.log(findDOMNode(this.refs.tweetContainer).getBoundingClientRect())
     
      //window.scrollTo(0, findDOMNode(document.body).scrollTop + (findDOMNode(this.refs.tweetContainer).getBoundingClientRect().top - 100))
      
      this.props.onClick(this.props.tweet.id_str)
      /*TODO:
        -wait for a second than try scrolling?
        -or handle the scroll logic in the reducer, but i dont think that makes sense*/
    }
    /*<a target="_blank" href={'https://twitter.com/'+this.props.tweet.user.screen_name+'/status/'+this.props.tweet.id_str}></a>*/
  	render (){
  		return (

          <ListItem
            className={styles.tweetContainer}
            onTouchTap={this.handleClick.bind(this)}
            leftAvatar={<Avatar src={this.props.tweet.user.profile_image_url} />}
            primaryText={<h4 className={styles.tweetHeader}>{this.props.tweet.user.name} <span>({this.props.tweet.user.screen_name})</span></h4>}
            secondaryText={<p dangerouslySetInnerHTML={{ __html: this.props.tweet.text }}></p>}
            secondaryTextLines={2}
            rightIcon={ this.props.tweet.entities.media ? <ImageIcon color="#b9b9b9" /> : null} 
          />

  			      
  		)
  	}

}


export default Tweet