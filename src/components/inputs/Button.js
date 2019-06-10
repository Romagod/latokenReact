import React, {Component} from 'react'

import styles from './Button.module.css'

export default class Button extends React.Component {
  render() {
    return <input type='button'
                  role='button'
                  className={`
                    ${styles.button}
                    ${this.base.style === 'Light' ? styles.buttonStyleLight : ''}
                  `}
                  value={this.base.value}
                  onClick={this.handlerClick}/>
  }

  handlerClick() {
    this.props.handlerClick()
  }

  constructor(props) {
    super(props)
    this.handlerClick = this.handlerClick.bind(this)

    this.base = this.props.base
  }
}
