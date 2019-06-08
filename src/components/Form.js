import React, { Component } from 'react'

import Button from './Button'
import { store } from '../containers/App'
import { addForm } from '../actions/InputActions'

export default class Form extends React.Component {
  render() {
    return <form action={this.base.action}>
      {this.props.children}
      <Button
        base={{
          value: 'Continue'
        }}
        clickhandler={this.handlerSubmit}/>
    </form>
  }

  handlerSubmit () {
    this.callSubmit.map(item => item())
  }

  setSubmit (callback) {
    this.callSubmit.push(callback)
  }

  sendForm () {
    fetch(this.base.action, {
      method: 'post',
      body: {}
    }).then(data => {

    }).catch (error => {
      console.error(error)
    })
  }

  constructor(props) {
    super(props)

    this.handlerSubmit = this.handlerSubmit.bind(this)
    this.sendForm = this.sendForm.bind(this)
    this.setSubmit = this.setSubmit.bind(this)

    this.callSubmit = []

    this.base = this.props.base

    store.dispatch(addForm(this.base.name, this.setSubmit))
  }
}
