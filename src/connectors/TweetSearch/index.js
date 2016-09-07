
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { push } from 'react-router-redux'

import { toggleFilters, changeFilter } from '../../actions/filters'
import { fetchTweets, selectTweet } from '../../actions/search'

import { isEmpty } from '../../utils'

import TweetSearchFilterBar from '../../components/TweetSearchFilterBar'
import TweetSearchResults from '../../components/TweetSearchResults'

import Divider from 'material-ui/Divider'

class TweetSearchConnector extends Component {
    static fetchData({ params, store, url }) {
      let trend = null
      if(store.getState().routing.locationBeforeTransitions){
        trend = store.getState().routing.locationBeforeTransitions.query.q
      }
      console.log(trend)
      return store.dispatch( fetchTweets(url, trend) )
    }

    constructor (props) {
      super(props) 
    }

    componentDidMount(){
      if( isEmpty(this.props.tweets) && !this.props.loading){
        this.props.fetchTweets(location.origin, this.props.trend)
      }
    }

    render () {
      let filterBarProps = {
        trend: this.props.trend,
        max_id: this.props.max_id,
        loading: this.props.loading,
        showFilters: this.props.showFilters,
        count: this.props.count,
        sort: this.props.sort,
        radius: this.props.radius,
        before: this.props.before,

        fetchTweets: this.props.fetchTweets,
        push: this.props.push,
        toggleFilters: this.props.toggleFilters,
        changeFilter: this.props.changeFilter
      }
      let restulsProps = {
        tweets: this.props.tweets,
        loading: this.props.loading,
        max_id: this.props.max_id,
        selected: this.props.selected,
        trend: this.props.trend,

        fetchTweets: this.props.fetchTweets,
        selectTweet: this.props.selectTweet,
      }
      return(       
        <div>
          <TweetSearchFilterBar {...filterBarProps} />
          <Divider />
          <TweetSearchResults {...restulsProps} />
        </div>)
    }
}

function mapStateToProps(state, ownParams) {
  let trend = null
  if(state.routing.locationBeforeTransitions){
    trend = state.routing.locationBeforeTransitions.query.q
  }
  return {
    tweets: state.search.tweets,
    loading: state.search.loading,
    max_id: state.search.max_id,
    selected: state.search.selected,
    trend: trend,

    showFilters: state.filters.showFilters,
    count: state.filters.count,
    sort: state.filters.result_type,
    radius: state.filters.radius,
    before: state.filters.before
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTweets: bindActionCreators(fetchTweets, dispatch),
    selectTweet: bindActionCreators(selectTweet, dispatch),

    push: bindActionCreators(push, dispatch),
    toggleFilters: bindActionCreators(toggleFilters, dispatch),
    changeFilter: bindActionCreators(changeFilter, dispatch)
  }
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(TweetSearchConnector)
