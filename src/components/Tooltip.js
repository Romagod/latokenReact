import React, { Component } from 'react'

export default class InputText extends React.Component {
  render() {
    this.isVisible = this.hasErrors()

    let result = null

    if (this.isVisible) {
      let id, current
      let idList = Object.keys(this.errors)

      let lastError = this.errors[idList[idList.length - 1]]

      result = <div>{ lastError }</div>
    }

    return result
  }

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
