import React, { Component } from 'react'

export default class Button extends React.Component {
  render() {
    return <input type="button"
      value={this.base.value}
      onClick={this.handlerClick}/>
  }

  handlerClick(event) {
    // event.stopPropagation()
    this.props.clickhandler()
  }

  constructor(props) {
    super(props)
    this.handlerClick = this.handlerClick.bind(this)

    this.base = this.props.base
  }
}
