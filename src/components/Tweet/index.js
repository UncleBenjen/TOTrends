import React, {Component} from 'react'
import styles from './style.css'

import {findDOMNode} from 'react-dom'

import {ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Divider from 'material-ui/Divider';

import Paper from 'material-ui/Paper';

import ImageIcon from 'material-ui/svg-icons/image/image'

class Tweet extends Component {

    constructor (props) {
      super(props)
    }

    handleClick(){
      //console.log(window.scrollY)
      //console.log(findDOMNode(document.body).scrollTop)
      //console.log(findDOMNode(this.refs.tweetContainer).getBoundingClientRect())
     
      //window.scrollTo(0, findDOMNode(document.body).scrollTop + (findDOMNode(this.refs.tweetContainer).getBoundingClientRect().top - 100))
      
      this.props.onClick(this.props.tweet.id_str)
      /*TODO:
        -wait for a second than try scrolling?
        -or handle the scroll logic in the reducer, but i dont think that makes sense*/
    }

    renderExpandedTweet(){


      let header = <CardHeader
              title={<a href={"https://twitter.com/"+this.props.tweet.user.screen_name} target="_blank" style={{fontSize:'15px',cursor:'pointer'}}><h4 className={styles.tweetHeader} >{this.props.tweet.user.name}</h4></a>}
              subtitle={'@'+this.props.tweet.user.screen_name}
              avatar={<Avatar src={this.props.tweet.user.profile_image_url} />}
            />

      let text = <CardText>{this.props.tweet.text}</CardText>

      let retweetedHeader = null

      if(this.props.tweet.retweeted_status){
        retweetedHeader = <CardHeader
              title={<a href={"https://twitter.com/"+this.props.tweet.retweeted_status.user.screen_name} target="_blank" style={{fontSize:'15px',cursor:'pointer'}}><h4 className={styles.tweetHeader} >{this.props.tweet.retweeted_status.user.name}</h4></a>}
              subtitle={'@'+this.props.tweet.retweeted_status.user.screen_name}
              avatar={<Avatar src={this.props.tweet.retweeted_status.user.profile_image_url} />}
              />
        text = <CardText>{this.props.tweet.retweeted_status.text}</CardText>
      }

      let media = null
      if (this.props.tweet.entities.media){
        media = <CardMedia>
              <img src={this.props.tweet.entities.media[0].media_url} />
            </CardMedia> 
      }

      return(
        <div>
          { header }
          <Divider />
          { retweetedHeader }
          { media }
          { text }
        </div>)
    }
    /*<a target="_blank" href={'https://twitter.com/'+this.props.tweet.user.screen_name+'/status/'+this.props.tweet.id_str}></a>*/
  	render (){
  		return (
        <Paper ref='tweetContainer' zDepth={ this.props.expanded ? 3 : 1} className={ this.props.expanded ? styles.expandedTweetContainer : styles.tweetContainer  }>
          { this.props.expanded ? 
              this.renderExpandedTweet()
            :
          <ListItem
            onTouchTap={this.handleClick.bind(this)}
            leftAvatar={<Avatar src={this.props.tweet.user.profile_image_url} />}
            primaryText={<h4 className={styles.tweetHeader}>{this.props.tweet.user.name} <span>({this.props.tweet.user.screen_name})</span></h4>}
            secondaryText={<p dangerouslySetInnerHTML={{ __html: this.props.tweet.text }}></p>}
            secondaryTextLines={2}
            rightIcon={ this.props.tweet.entities.media ? <ImageIcon color="#b9b9b9" /> : null} 
          />}
        </Paper>

  			      
  		)
  	}

}


export default Tweet