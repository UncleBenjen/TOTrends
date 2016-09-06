import React, {Component} from 'react'
import styles from './style.css'

class Header extends Component {

	constructor (props) {
    	super(props)
  	}

  	render (){
  		return (
  			<div className={styles.splashContainer}>
          <div className={styles.circular}></div>
	  			<h1><span>T.O.</span>&nbsp;<span>Trends</span></h1>
  			</div>
  		)
  	}

}


export default Header