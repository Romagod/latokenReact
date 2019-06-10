import React, {Component} from 'react'
import styles from './InputText.module.css'


export default class InputText extends React.Component {
  render() {
    let renderingInput

    if (this.options.type === 'textarea') {
      renderingInput =
        <textarea role='input'
                  className={styles.inputTextArea}
                  name={this.base.name}
                  placeholder={this.base.placeholder || ''}
                  id={this.base.id || ''}
                  onInput={this.handlerInput}
                  onBlur={this.handlerChange}>
        </textarea>
    } else {
      renderingInput =
        <input type='text'
               role='input'
               className={styles.inputText}
               name={this.base.name}
               placeholder={this.base.placeholder || ''}
               id={this.base.id || ''}
               onInput={this.handlerInput}
               onBlur={this.handlerChange}
        />
    }

    return renderingInput
  }

  handlerInput(event) {
    this.methods.onInput(event.target.value)
  }

  handlerChange(event) {
    this.methods.onChange(event.target.value)
  }

  constructor(props) {
    super(props)
    this.handlerInput = this.handlerInput.bind(this)
    this.handlerChange = this.handlerChange.bind(this)

    this.base = this.props.base
    this.options = this.props.options
    this.methods = this.props.methods
  }
}
