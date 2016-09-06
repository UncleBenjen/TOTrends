import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { isEmpty } from '../../utils'

import { fetchTweets, selectTweet } from '../../actions/search'

import TweetSearchResults from '../../components/TweetSearchResults'

import CircularProgress from 'material-ui/CircularProgress';

class TweetSearchResultsConnector extends Component {
    static fetchData({ params, store, url }) {
      console.log(this.props.trend)
      return store.dispatch( fetchTweets(url, this.props.trend) )
    }

    constructor (props) {
      super(props) 
    }

    componentDidMount(){
      if( isEmpty(this.props.tweets) && !this.props.loading){
        this.props.fetchTweets(location.origin, this.props.trend)
      }
    }

    render(){
      return( (isEmpty(this.props.tweets) && this.props.loading)  ? <CircularProgress size={0.80}/> : <TweetSearchResults {...this.props} />)
    }
}

function mapStateToProps(state, ownParams) {
  return {
    tweets: state.search.tweets,
    loading: state.search.loading,
    trend: state.routing.locationBeforeTransitions.query.q || null,
    max_id: state.search.max_id,
    selected: state.search.selected
  }
}

function mapDispatchToProps(dispatch) {
  return {
  	fetchTweets: bindActionCreators(fetchTweets, dispatch),
    selectTweet: bindActionCreators(selectTweet, dispatch)
  }
}

module.exports = connect(
  mapStateToProps, 
  mapDispatchToProps
)(TweetSearchResultsConnector)