import React, { Component } from 'react'
import styles from './Dropdown.module.css'

export default class ListItem extends React.Component {
  render() {
    return <li role="dropdown-item"
      className={this.base.isActive ? styles.active : null}
      data-id={this.base.id}
      onClick={this.handlerClick}
      >
      { this.props.value }
    </li>
  }

  handlerClick (event) {
    // event.preventDefault()
    this.props.clickHandler(this.base)
  }

  constructor(props) {
    super(props)
    this.handlerClick = this.handlerClick.bind(this)

    this.base = this.props.base
  }
}
