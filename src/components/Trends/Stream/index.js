import React, {Component} from 'react'
import styles from './style.css'

import { isEmpty } from '../../../utils'

import Tweet from '../../Tweet'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import TextField from 'material-ui/TextField';

import Toggle from 'material-ui/Toggle';

import {Card} from 'material-ui/Card';

import Divider from 'material-ui/Divider';
import {List} from 'material-ui/List';

import Paper from 'material-ui/Paper';

import ReactList from 'react-list';

class Stream extends Component {

  constructor (props) {
      super(props)
    }

    toggleStream(){
    	if(this.props.active){
    		this.props.stop()
    	}
    	else{
    		this.props.start()
    	}

    }

    renderItem(index, key){
    	return(<Tweet key={key} index={index} tweet={this.props.tweets[index]} delete={this.props.removeTweet} />)
    }

    render (){
    	let tweets = [];

		if( !isEmpty(this.props.tweets)){
			tweets = this.props.tweets.map((t, i) => {
			  return(<Tweet key={t.id} index={i} tweet={t} delete={this.props.removeTweet} />)
			})
		}

/*				<ReactCSSTransitionGroup 
					transitionName={ {
				      enter: styles.tweetEnter,
				      enterActive: styles.tweetEnterActive,
				      leave: styles.tweetLeave,
				      leaveActive: styles.tweetLeaveActive
				    } }
				    transitionEnterTimeout={100} 
				    transitionLeaveTimeout={100}>
	      			{tweets}
	      		</ReactCSSTransitionGroup>*/
      return (
      	<Paper zDepth={2} className={styles.tweetStreamContainer}>
			<Toolbar>
				<ToolbarGroup className={styles.keywordInput} firstChild={true}>
					<TextField
						disabled={true}
				      	hintText="Filter by keyword"
				    />
				</ToolbarGroup>
				<ToolbarGroup>
					    <Toggle
					    	className={styles.toggle}
					      	label={this.props.active ? 'Active':'Inactive'}
					      	toggled={this.props.active}
					      	onToggle={this.toggleStream.bind(this)}
					    />
				</ToolbarGroup>
			</Toolbar>

			<List className={styles.tweetList} style={{height:'80vh', overflowY:'scroll'}}>
				<ReactList
		            itemRenderer={this.renderItem.bind(this)}
		            length={this.props.tweets.length}
		            type='uniform'
		          />
      		</List>
      </Paper>)
    }

}


export default Stream