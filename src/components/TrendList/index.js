
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import styles from './style.css'

import { isEmpty } from '../../utils'

import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';

import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'

import theme from '../../theme'

class TrendList extends Component {

  constructor (props) {
    super(props)
  }

  handleSubmit (e){
    e.preventDefault();
    if(this.refs.customSearchInput.input.value){
       this.props.push({ 
          pathname: '/search',
          query:{
            q: this.refs.customSearchInput.input.value
          }
       })
    }
  }

  render () {
    let trends = []

    if( !isEmpty(this.props.trends) ){
      trends = this.props.trends.map((t, i) => {
        //return(<ListItem primaryText={t.name} key={t.name} />)
        return(<Link  key={t.name} to={{ pathname: '/search', query: { q: t.name } }}><FlatButton secondary={true} label={t.name} labelStyle={{textTransform:'none'}} /></Link>)
      })
    }
    
    return (
    	<div className={styles.listContainer}>
	    	<p>Check out what people are tweeting in Toronto by choosing one of the following top 50 trends:</p>
        <div className={styles.trendsContainer}>
          {trends}
        </div>
        <div className={styles.separator}>
          <Divider style={{width:'33%'}} />
          <h4>OR</h4>
          <Divider style={{width:'33%'}} />
        </div>
        <p>Make up your own trend and see whether anyone in Toronto is tweeting about it! Any keyword, hashtag, or user, will work:</p>
        <form onSubmit={this.handleSubmit.bind(this)} className={styles.customSearchForm}>
          <TextField
            className={styles.customSearchInput}
            ref='customSearchInput'
            hintText="ex. Toronto, #TOTrends, @norm, etc..."
            errorText="Results will be based on proximity to Toronto's city hall."
            errorStyle={{ color: theme.palette.accent1Color }}
          />
          <RaisedButton className={styles.customSearchButton} label={"Search"} secondary={true} type="submit"  />
        </form>
    	</div>)
  }
}

export default TrendList

