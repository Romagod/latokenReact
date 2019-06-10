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
        {/*render back button*/}
        <Button
          base={{
            value: 'Back',
            style: 'Light'
          }}
          handlerClick={this.handlerBack}/>
        {/*render submit button*/}
        <Button
          base={{
            value: 'Continue'
          }}
          handlerClick={this.handlerSubmit}/>
      </div>

    </form>
  }

  // submit button click event handler
  handlerSubmit () {
    // emit submit event for listeners
    this.callSubmit.map(item => item())
    this.sendForm()
  }

  // back button click event handler
  handlerBack () {
    // ...
  }

  // get new submit event listener
  setSubmit (callback) {
    this.callSubmit.push(callback)
  }

  // send data to server
  sendForm () {
    //  exit if form have errors
    if (this.hasErrors()) {
      return
    }

    // init new form data
    let formData = new FormData(this.refForm.current)

    // send data to a server
    fetch(this.base.action, {
      method: 'post',
      body: formData
    }).then(data => {

    }).catch (error => {
      console.error(error)
    })
  }

  // checking form for errors
  hasErrors () {
    // get input list from store
    let formElements = store.getState().forms[this.base.name]

    // check error for all inputs
    for (let key in formElements) {
      // continue if current element is not input
      if (!formElements[key].errors) continue

      // return true if any element has an error
      if (Object.keys(formElements[key].errors).length ) {
        return true
      }
    }
    // return false if all element has not an error
    return false
  }

  constructor(props) {
    super(props)

    this.handlerSubmit = this.handlerSubmit.bind(this)
    this.handlerBack = this.handlerBack.bind(this)
    this.sendForm = this.sendForm.bind(this)
    this.setSubmit = this.setSubmit.bind(this)
    this.hasErrors = this.hasErrors.bind(this)

    // link to form element
    this.refForm = React.createRef()

    // submit listeners list
    this.callSubmit = []

    this.base = this.props.base

    // save if store form submit function for potential listeners
    store.dispatch(addForm(this.base.name, this.setSubmit))
  }
}

