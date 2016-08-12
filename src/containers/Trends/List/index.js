
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import styles from './style.css'

import theme from '../../../theme'

import { isEmpty } from '../../../utils'

import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';

import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

class TrendList extends Component {
  /* 
  Since the App container fetches the top trends, there is no need 
  for a static fetchData function in this comp. as of now

  static fetchData({ params, store, url }) {
    return
  }*/

  constructor (props) {
    super(props)
  }

  componentDidMount () {}

  render () {
    let trends = []

    if( !isEmpty(this.props.trends) ){
      trends = this.props.trends.map((t, i) => {
        return(<Link to={{ pathname: 'stream', query: { trend: t.name } }} key={t.name}><FlatButton label={t.name} /></Link>)
      })
    }

    return (<div className={styles.home}>{trends}</div>)
  }
}

function mapStateToProps(state) {
  return { 
    trends: state.trends.list
  }
}


export default connect(mapStateToProps)(TrendList)

