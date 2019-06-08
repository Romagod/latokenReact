import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { store } from './App'

import Tooltip from '../components/Tooltip'

import * as InputActions from '../actions/InputActions'

export default function inputWrapper(InputComponent, form) {
  class InputApp extends Component {
    constructor (props) {
      super(props)

      this.actions = bindActionCreators(InputActions, this.props.dispatch)

      this.name = this.props.base.name
      this.base = this.props.base

      this.actions.addInput(form, this.name)

      this.data = this.props.input[form][this.name]

      this.handlerChange = this.handlerChange.bind(this)
      this.handlerInput = this.handlerInput.bind(this)
      this.handlerSubmit = this.handlerSubmit.bind(this)
      this.validate = this.validate.bind(this)
      this.hasErrors = this.hasErrors.bind(this)
      this.getStatus = this.getStatus.bind(this)
      this.changeStatus = this.changeStatus.bind(this)
      this.removeFlashErrors = this.removeFlashErrors.bind(this)
      this.flashError = this.flashError.bind(this)

      store.getState().input[form].submit(this.handlerSubmit)
}

    render () {
      console.log('wrapper render', this.props)
      let inputPropsData = this.props.input[form][this.name] || store.getState().input[form][this.name]
      let { value, errors } =  inputPropsData
      let { info, title } = this.props.info(value, this.base)

      let input = <div>
        <div> has errors: { this.hasErrors().toString() } </div>
        <div> status: { this.getStatus() } </div>
        <div> title: { title } </div>
        <div> info: { info } </div>
        <InputComponent
          base={this.props.base}
          options={this.props.options}
          value={value}
          status={status}
          onInput={this.handlerInput}
          onChange={this.handlerChange}
          onSubmit={this.handlerSubmit}
          addError={this.flashError}
        />
        <Tooltip
          errors={this.props.input[form][this.name].errors}
        />
        <hr/>
      </div>

      return input
    }

    handlerChange (value) {
      this.actions.changeValue(form, this.name, value)
      if (this.props.validators && this.props.validators.change) this.validate(this.props.validators.change, value)
    }

    handlerInput (value) {
      this.actions.changeValue(form, this.name, value)
      if (this.props.validators && this.props.validators.input) this.validate(this.props.validators.input, value)
    }

    handlerSubmit () {
      let value = this.props.input[form][this.name].value

      if (this.props.validators && this.props.validators.submit) this.validate(this.props.validators.submit, value)
    }

    validate (validatorList, value) {
      this.removeFlashErrors()
      validatorList.map(validator => {
        let validInfo = validator(value, this.base)

        if (validInfo.result) {
          this.actions.deleteError(form, this.name, `${this.name}-${validInfo.name}`)
          this.hasErrors() ? this.changeStatus('error') : this.changeStatus('default')
        } else {
          this.actions.addError(form, this.name, `${this.name}-${validInfo.name}`, validInfo.errorMessage)
          this.changeStatus('error')
        }
      })
    }

    removeFlashErrors () {
      for (let key in this.data.error) {
        if (!!~key.indexOf('flash')) {
          this.actions.deleteError(form, this.name, key)
        }
      }
    }

    flashError (name, message) {
      name = 'flash-' + message
      this.actions.addError(form, this.name, name, message)
    }

    hasErrors () {
      let errorList = this.props.input[form][this.name].errors
      return Object.keys(errorList).length !== 0
    }

    getStatus () {
      return this.props.input[form][this.name].status
    }

    changeStatus (status) {
      this.actions.changeStatus(form, this.name, status)
    }

  }

  return connect(state => ({
    input: state.input
  }))(InputApp)
}
