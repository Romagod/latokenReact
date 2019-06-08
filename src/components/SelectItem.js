import React, { Component } from 'react'
import styles from './Dropdown.module.css'

export default class SelectItem extends React.Component {
  render() {
    // console.log(this.base.value, this.base.id)
    return <li role="dropdown-item">

      { this.base.value }
      <div
        role="dropdown-remove-btn"
        className={styles.remove}
        onClick={this.handlerClick}>
        R
      </div>
    </li>
  }

  handlerClick (event) {
    event.stopPropagation()
    event.preventDefault()

    this.props.clickHandler(this.base)
  }


  constructor(props) {
    super(props)
    this.handlerClick = this.handlerClick.bind(this)

    this.base = this.props.base
  }
}
