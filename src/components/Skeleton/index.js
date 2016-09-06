import React, { Component } from 'react'

import Viewport from '../Viewport/Viewport'
import Section from '../Section/Section'
import Header from '../Header'
import Footer from '../Footer/Footer'

import styles from './style.css'

/* generic styles */
import base from '../../styles/base.css'
import normalize from '../../styles/normalize.css'
Object.assign(base, normalize)

import theme from '../../theme'

class Skeleton extends Component {

    constructor (props) {
      super(props)
    }

    render (){

      return (
          <Viewport> 

            <Header />

            <Section>{ this.props.children }</Section>

            <Footer>
              <p>
                <span>Developed by <a href="http://benjaminspeir.com">Benjamin Speir</a></span>
                <span><a href="https://github.com/UncleBenjen/TwitterTrends">View on GitHub</a></span>
              </p>
            </Footer>

          </Viewport>
      );
    }
  
};

export default Skeleton;
