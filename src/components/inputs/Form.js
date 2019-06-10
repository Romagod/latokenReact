import React, { Component } from 'react'

import Button from './Button'
import { store } from '../../containers/App'
import { addForm } from '../../actions/InputActions'

import styles from './Form.module.css'

export default class Form extends React.Component {
  render() {
    return <form ref={this.refForm} action={this.base.action} className={styles.form}>
      {this.props.children}
      <div className={styles.buttonWrapper}>
        <Button
          base={{
            value: 'Back',
            style: 'Light'
          }}
          handlerClick={this.handlerBack}/>
        <Button
          base={{
            value: 'Continue'
          }}
          handlerClick={this.handlerSubmit}/>
      </div>

    </form>
  }

  handlerSubmit () {
    this.callSubmit.map(item => item())
    this.sendForm()
  }

  handlerBack () {
    // ...
  }

  setSubmit (callback) {
    this.callSubmit.push(callback)
  }

  sendForm () {
    if (this.hasErrors()) {
      return
    }

    let formData = new FormData(this.refForm.current)

    fetch(this.base.action, {
      method: 'post',
      body: formData
    }).then(data => {

    }).catch (error => {
      console.error(error)
    })
  }

  hasErrors () {
    let formElements = store.getState().forms[this.base.name]

    for (let key in formElements) {
      console.log(formElements[key].errors)
      if (!formElements[key].errors) continue

      if (Object.keys(formElements[key].errors).length ) {
        return true
      }
    }

    return false
  }

  constructor(props) {
    super(props)

    this.handlerSubmit = this.handlerSubmit.bind(this)
    this.handlerBack = this.handlerBack.bind(this)
    this.sendForm = this.sendForm.bind(this)
    this.setSubmit = this.setSubmit.bind(this)
    this.hasErrors = this.hasErrors.bind(this)

    this.refForm = React.createRef()

    this.callSubmit = []

    this.base = this.props.base

    store.dispatch(addForm(this.base.name, this.setSubmit))
  }
}

