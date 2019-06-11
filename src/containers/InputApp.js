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

      // bind actions from store with component
      this.actions = bindActionCreators(InputActions, this.props.dispatch)

      this.name = this.props.base.name
      this.base = this.props.base
      this.options = this.props.options || {}

      // create new input in store
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

      // listening to submit event
      store.getState().forms[form].submit(this.handlerSubmit)
    }

    render() {
      // additional info render
      let additionalInfo

      // display additional info if it defines
      if (this.props.info) {
        additionalInfo = this.props.info(this.data.value, this.base)
      }

      // render input wrapper
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

          {/*render tooltip*/}
          <Tooltip
            errors={this.data.errors}
          />

          {/*render received input component*/}
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

    // validate and add to store value, received from child component by change event
    handlerChange(value) {
      this.changeValue(value)
      if (this.props.validators && this.props.validators.change) this.validate(this.props.validators.change, value)
    }

    // validate and add to store value, received from child component by input event
    handlerInput(value) {
      this.changeValue(value)
      if (this.props.validators && this.props.validators.input) this.validate(this.props.validators.input, value)
    }

    // validate and add to store value, received from child component by submit event
    handlerSubmit() {
      let value = this.data.value
      if (this.props.validators && this.props.validators.submit) this.validate(this.props.validators.submit, value)
    }

    // auto validator
    validate(validatorList, value) {
      validatorList.map(validator => {
        let validInfo = validator(value, this.base)

        if (validInfo.result) {
          // delete error if it not more actually relevant and change component status
          this.deleteError(validInfo)
          this.hasErrors() ? this.changeStatus(INPUT_ERROR) : this.changeStatus(INPUT_DEFAULT)
        } else {
          // add new error
          !!~validInfo.name.indexOf('Required') ? this.addError(validInfo, true) : this.addError(validInfo);
        }
      })
    }

    // remove all flash errors
    removeFlashErrors() {
      for (let key in this.data.errors) {
        if (!!~key.indexOf('flash')) {
          this.actions.deleteError(form, this.name, key)
        }
      }
    }

    // add new error
    addError(validInfo, flash = false) {
      let errorId = `${this.name}-${validInfo.name}${flash ? '-flash' : ''}`
      this.actions.addError(form, this.name, errorId, validInfo.errorMessage)
      this.changeStatus(INPUT_ERROR)
    }

    // delete error
    deleteError(validInfo) {
      this.actions.deleteError(form, this.name, `${this.name}-${validInfo.name}`)
    }

    hasErrors() {
      let errorList = this.data.errors
      return Object.keys(errorList).length !== 0
    }

    changeStatus(status, external = false) {
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
