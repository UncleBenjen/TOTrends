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
                <span>Developed by <a href="http://benjaminspeir.com">Ben Speir</a>.</span>
                <span>Photo by Tim Gouw on <a href='https://unsplash.com/@punttim'>Unsplash</a>.</span>
                <span>Built on <a href='https://facebook.github.io/react/'>React</a> and <a href='http://redux.js.org/'>Redux</a>.</span>
              </p>
            </Footer>

          </Viewport>
      );
    }
  
};

export default Skeleton;
