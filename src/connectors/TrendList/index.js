
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchTrends } from '../../actions/trends'

import { isEmpty } from '../../utils'

import TrendList from '../../components/Trends/List'

import CircularProgress from 'material-ui/CircularProgress';

class TrendListConnector extends Component {
    static fetchData({ params, store, url }) {
      return store.dispatch( fetchTrends(url) )
    }

    constructor (props) {
      super(props)
    }

    componentDidMount () {
      if(isEmpty(this.props.trends) && !this.props.loading){
        this.props.fetchTrends(location.origin)
      }
    }

    render () {
      return( this.props.loading ? <CircularProgress size={0.80} /> : <TrendList {...this.props} />)
    }
}

function mapStateToProps(state, ownParams) {
  return {
    trends: state.trends.list,
    loading: state.trends.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTrends: bindActionCreators(fetchTrends, dispatch)
  }
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrendListConnector)
