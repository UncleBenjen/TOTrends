
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { startStream, stopStream, removeTweet } from '../../actions/streaming' 

import TweetStream from '../../components/Trends/Stream'

class StreamContainer extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.startStream()
  }
  
  componentWillUnmount(){
    this.props.stopStream()
  }

  render () { return(<TweetStream {...this.props} />) }
}

function mapStateToProps(state) {
  return {
    tweets: state.tweets,
    active: state.stream
  }
}

function mapDispatchToProps(dispatch) {
  return { 
    start: bindActionCreators(startStream, dispatch), 
    stop: bindActionCreators(stopStream, dispatch), 
    removeTweet: bindActionCreators(removeTweet, dispatch)
  }
}

module.exports = connect(
	mapStateToProps, 
	mapDispatchToProps
)(StreamContainer)
