
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'


import styles from './style.css'


import { isEmpty } from '../../../utils'

import FlatButton from 'material-ui/FlatButton'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

class TrendList extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    let trends = []

    if( !isEmpty(this.props.trends) ){
      trends = this.props.trends.map((t, i) => {
        //return(<ListItem primaryText={t.name} key={t.name} />)
        return(<Link  key={t.name} to={{ pathname: '/search', query: { q: t.name } }}><FlatButton secondary={true} label={t.name} labelStyle={{textTransform:'none'}} /></Link>)
      })
    }
    /*<p>Start by selecting one of the top 50 trending topics for the city of Toronto:</p>*/
    return (
    	<div className={styles.listContainer}>
	    	<Divider />
        <div className={styles.trendsContainer}>
          {trends}
        </div>
    	</div>)
  }
}

export default TrendList

