import React, { Component } from 'react'

import {findDOMNode} from 'react-dom'

import styles from './style.css'

import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import Divider from 'material-ui/Divider';

import Paper from 'material-ui/Paper';

import Badge from 'material-ui/Badge';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ImageIcon from 'material-ui/svg-icons/image/image'
import RetweetIcon from 'material-ui/svg-icons/action/cached'
import FavouriteIcon from 'material-ui/svg-icons/action/favorite-border'

class ExpandedTweet extends Component {

    constructor (props) {
      super(props)
    }

    componentDidMount(){
      //console.log(findDOMNode(document.body).scrollTop)
      //console.log(findDOMNode(this.refs.expandedTweetContainer).getBoundingClientRect())
      window.scrollTo(0, findDOMNode(document.body).scrollTop + (findDOMNode(this.refs.expandedTweetContainer).getBoundingClientRect().top - 26))
    }

    parseText(originalText, entities){
      
    }

    render (){

      let retweetedHeader = null

      let text = null

      text = this.parseText(this.props.tweet.text, this.props.tweet.entities)
      
      if(this.props.tweet.retweeted_status){
        retweetedHeader = <CardHeader
              title={<a href={"https://twitter.com/"+this.props.tweet.retweeted_status.user.screen_name} target="_blank" className={styles.anchor}>{this.props.tweet.retweeted_status.user.name}</a>}
              subtitle={'@'+this.props.tweet.retweeted_status.user.screen_name}
              avatar={<Avatar src={this.props.tweet.retweeted_status.user.profile_image_url} />}
              />
      }

      let media = null
      if (this.props.tweet.entities.media){
        media = <CardMedia>
              <img src={this.props.tweet.entities.media[0].media_url} />
            </CardMedia> 
      }
      return (
        <Paper ref='expandedTweetContainer' zDepth={3} className={ styles.expandedTweetContainer }>
            <CardHeader
              title={<a href={"https://twitter.com/"+this.props.tweet.user.screen_name} target="_blank" className={styles.anchor}>{this.props.tweet.user.name}</a>}
              subtitle={'@'+this.props.tweet.user.screen_name}
              avatar={<Avatar src={this.props.tweet.user.profile_image_url} />}
            />
            { this.props.tweet.retweeted_status ? <Divider />: null } 
            { retweetedHeader }
            { media }
            <CardText>{ this.props.tweet.retweeted_status ? this.props.tweet.retweeted_status.text : this.props.tweet.text }</CardText>
            <CardActions>
              <FlatButton disabled={true} label={ this.props.tweet.retweeted_status ? JSON.stringify(this.props.tweet.retweeted_status.retweet_count) : JSON.stringify(this.props.tweet.retweet_count)} icon={<RetweetIcon />}/>
              <FlatButton disabled={true} label={ this.props.tweet.retweeted_status ? JSON.stringify(this.props.tweet.retweeted_status.favorite_count) : JSON.stringify(this.props.tweet.favorite_count)} icon={<FavouriteIcon />}/>
            </CardActions>
        </Paper>

      );
    }
  
};

export default ExpandedTweet;
