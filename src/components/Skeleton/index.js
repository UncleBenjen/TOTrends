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
      //<div className={styles.footerImage}>&nbsp;</div>
      return (
          <Viewport> 

            <Header />

            <Section>{ this.props.children }</Section>


            <Footer>
              <p>
                <span>Developed by <a href="http://benjaminspeir.com">Ben Speir</a>.</span>
                <span>Photos by <a  rel='nofollow' href='https://unsplash.com/@punttim'>Tim Gouw</a>, and the <a rel='nofollow' href='https://unsplash.com'>Unsplash</a> community.</span>
                <span>Built on <a  rel='nofollow' href='https://facebook.github.io/react/'>React</a>, <a  rel='nofollow' href='http://redux.js.org/'>Redux</a>, and <a rel='nofollow' href='http://www.material-ui.com/'>Material-UI</a>.</span>
              </p>
            </Footer>

          </Viewport>
      );
    }
  
};

export default Skeleton;
