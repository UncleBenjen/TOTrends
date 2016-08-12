
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styles from './style.css'

import theme from '../../../theme'

import { isEmpty } from '../../../utils'

import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';

import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';

class TrendStream extends Component {
  
  static fetchData({ params, store, url }) {
    return
  }

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    
  }

  render () {
      <h1>STREAM</h1>
  }
}

function mapStateToProps(state) {
  return state
}


export default connect(mapStateToProps)(TrendStream)
