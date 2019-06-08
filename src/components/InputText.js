import React, { Component } from 'react'

export default class InputText extends React.Component {
  render() {
    console.log('text render ' + this.base.name)
    // let { name, id, placeholder }

    return <input type="text"
      onInput={this.handlerInput}
      onBlur={this.handlerChange}/>
  }

  handlerInput(event) {
    this.props.onInput(event.target.value)
  }

  handlerChange(event) {
    console.log('change-inputText')
    this.props.onChange(event.target.value)
  }

  constructor(props) {
    super(props)
    this.handlerInput = this.handlerInput.bind(this)
    this.handlerChange = this.handlerChange.bind(this)

    this.base = this.props.base
  }
}
