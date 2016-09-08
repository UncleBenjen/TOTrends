import React, { Component, PropTypes } from 'react'
import styles from './Footer.css'

import IconButton from 'material-ui/IconButton';

import SvgIcon from 'material-ui/SvgIcon';

const GitHubIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 32 32">
<path  d="M32.58,16.29A16.29,16.29,0,0,1,21.45,31.74c-.83.16-1.12-.35-1.12-.78s0-2.29,0-4.47a3.89,3.89,0,0,0-1.11-3c3.63-.4,7.44-1.78,7.44-8A6.29,6.29,0,0,0,25,11.07a5.85,5.85,0,0,0-.16-4.31s-1.37-.44-4.48,1.67a15.44,15.44,0,0,0-8.16,0C9.1,6.32,7.73,6.76,7.73,6.76a5.86,5.86,0,0,0-.16,4.31A6.3,6.3,0,0,0,5.9,15.44c0,6.24,3.8,7.64,7.42,8.05a3.48,3.48,0,0,0-1,2.18,3.47,3.47,0,0,1-4.74-1.35A3.42,3.42,0,0,0,5,22.63s-1.59,0-.11,1A4.31,4.31,0,0,1,6.74,26s1,3.17,5.49,2.18c0,1.36,0,2.38,0,2.77s-.3.93-1.11.79A16.29,16.29,0,1,1,32.58,16.29Z"/>
  </SvgIcon>
);

export default class Footer extends Component {

  render () {
    return (
    	<footer className={styles.footer}>
    		{this.props.children}

        <IconButton href='https://github.com/UncleBenjen/TOTrends' disableTouchRipple={true}><GitHubIcon color={'DCDCDC'} hoverColor={'FFFFFF'}/></IconButton>
    	</footer>
    )
  }

  constructor (props) {
    super(props)
  }
}
