import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {store} from './App'

import Tooltip from '../components/inputs/Tooltip'
import styles from './InputApp.module.css'

import * as InputActions from '../actions/InputActions'

export const INPUT_SUCCESS = 'INPUT_SUCCESS'
export const INPUT_ERROR = 'INPUT_ERROR'
export const INPUT_DEFAULT = 'INPUT_DEFAULT'

export default function inputWrapper(InputComponent, form) {
  class InputApp extends Component {
    constructor(props) {
      super(props)

      this.actions = bindActionCreators(InputActions, this.props.dispatch)

      this.name = this.props.base.name
      this.base = this.props.base
      this.options = this.props.options || {}

      this.actions.addInput(form, this.name)

      this.data = this.props.forms[form][this.name]

      this.handlerChange = this.handlerChange.bind(this)
      this.handlerInput = this.handlerInput.bind(this)
      this.handlerSubmit = this.handlerSubmit.bind(this)
      this.validate = this.validate.bind(this)
      this.changeStatus = this.changeStatus.bind(this)
      this.changeOption = this.changeOption.bind(this)
      this.changeValue = this.changeValue.bind(this)
      this.hasErrors = this.hasErrors.bind(this)
      this.addError = this.addError.bind(this)
      this.deleteError = this.deleteError.bind(this)
      this.removeFlashErrors = this.removeFlashErrors.bind(this)

      store.getState().forms[form].submit(this.handlerSubmit)
    }

    render() {
      let additionalInfo

      if (this.props.info) {
        additionalInfo = this.props.info(this.data.value, this.base)
      }

      let input = <div className={`
        ${styles.input}
        ${this.data.status === INPUT_ERROR ? styles.warning : ''}
        ${this.data.status === INPUT_SUCCESS ? styles.success : ''}
        ${additionalInfo ? '' : styles.inputWithoutHeader}
      `}>

        {!additionalInfo ? '' :
          <div className={styles.inputInfo}>
            <div className={styles.title}>
              {additionalInfo.title}
              {!this.base.required ? '' :
                <span className={styles.required}> *</span>
              }
            </div>
            <div className={styles.addInfo}> {additionalInfo.info} </div>
          </div>
        }

        <div className={styles.inputWrapper}>

          <Tooltip
            errors={this.data.errors}
          />

          <InputComponent base={this.base}
                          data={this.data}
                          options={this.options}
                          methods={{
                            onInput: this.handlerInput,
                            onChange: this.handlerChange,
                            onSubmit: this.handlerSubmit,
                            addError: validInfo => this.addError(validInfo, true),
                            hasErrors: this.hasErrors,
                            changeOption: this.changeOption,
                            changeStatus: status => this.changeStatus(status, true)
                          }}
          />
        </div>

      </div>

      return input
    }

    handlerChange(value) {
      this.changeValue(value)
      if (this.props.validators && this.props.validators.change) this.validate(this.props.validators.change, value)
    }

    handlerInput(value) {
      this.changeValue(value)
      if (this.props.validators && this.props.validators.input) this.validate(this.props.validators.input, value)
    }

    handlerSubmit() {
      let value = this.data.value
      if (this.props.validators && this.props.validators.submit) this.validate(this.props.validators.submit, value)
    }

    validate(validatorList, value) {
      validatorList.map(validator => {
        let validInfo = validator(value, this.base)

        if (validInfo.result) {
          this.deleteError(validInfo)
          this.hasErrors() ? this.changeStatus(INPUT_ERROR) : this.changeStatus(INPUT_DEFAULT)
        } else {
          !!~validInfo.name.indexOf('Required') ? this.addError(validInfo, true) : this.addError(validInfo);
        }
      })
    }

    removeFlashErrors() {
      for (let key in this.data.errors) {
        if (!!~key.indexOf('flash')) {
          this.actions.deleteError(form, this.name, key)
        }
      }
    }

    addError(validInfo, flash = false) {
      let errorId = `${this.name}-${validInfo.name}${flash ? '-flash' : ''}`
      this.actions.addError(form, this.name, errorId, validInfo.errorMessage)
      this.changeStatus(INPUT_ERROR)
    }

    deleteError(validInfo) {
      this.actions.deleteError(form, this.name, `${this.name}-${validInfo.name}`)
    }

    hasErrors() {
      let errorList = this.data.errors
      return Object.keys(errorList).length !== 0
    }

    changeStatus(status, external = false) {
      console.log(status,this.data.status,  external)
      if (!external && status === INPUT_SUCCESS && this.data.status === INPUT_DEFAULT) {
        return
      }

      if (!external && status === INPUT_DEFAULT && this.data.status === INPUT_SUCCESS) {
        return
      }

      this.actions.changeStatus(form, this.name, status)
    }

    changeOption(option) {
      this.actions.changeOption(form, this.name, option)
    }

    changeValue(value) {
      this.removeFlashErrors()
      if (!this.hasErrors()) this.changeStatus(INPUT_DEFAULT)
      this.actions.changeValue(form, this.name, value)
    }

  }

  return connect(state => ({
    forms: state.forms
  }))(InputApp)
}
