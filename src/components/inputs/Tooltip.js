import React, { Component } from 'react'

import styles from './Tooltip.module.css'

export default class InputText extends React.Component {
  // render tooltip
  render() {
    // show tooltip if component have errors
    this.isVisible = this.hasErrors()

    let result = null

    // construct tooltip
    if (this.isVisible) {
      let idList = Object.keys(this.errors)

      // get last added error
      let lastError = this.errors[idList[idList.length - 1]]

      result = <div className={styles.tooltip}>{ lastError }</div>
    }

    return result
  }

  // check component for errors
  hasErrors () {
    return Object.keys(this.errors).length !== 0
  }

  constructor(props) {
    super(props)
    this.base = this.props.base
    this.errors = this.props.errors

    this.isVisible = false

    this.hasErrors = this.hasErrors.bind(this)
  }
}
