import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { push } from 'react-router-redux'

import { toggleFilters, changeFilter } from '../../actions/filters'
import { fetchTweets } from '../../actions/search'

import TweetSearchFilterBar from '../../components/TweetSearchFilterBar'

function mapStateToProps(state, ownParams) {
  return {
    trend: state.routing.locationBeforeTransitions.query.q || null,
    max_id: state.search.max_id,
    loading:state.search.loading,
    showFilters: state.filters.showFilters,
    count: state.filters.count,
    sort: state.filters.result_type,
    radius: state.filters.radius,
    before: state.filters.before
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: bindActionCreators(push, dispatch),
    toggleFilters: bindActionCreators(toggleFilters, dispatch),
    changeFilter: bindActionCreators(changeFilter, dispatch),
    fetchTweets: bindActionCreators(fetchTweets, dispatch)
  }
}

module.exports = connect(
  mapStateToProps, 
  mapDispatchToProps
)(TweetSearchFilterBar)