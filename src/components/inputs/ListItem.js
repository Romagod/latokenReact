import React, { Component } from 'react'
import styles from './ListItem.module.css'

export default class ListItem extends React.Component {
  render() {
    return <li role="dropdown-item"
      className={`
        ${styles.item}
        ${this.base.isActive ? styles.active : null}`
      }
      data-id={this.base.id}
      onClick={this.handlerClick}
      >
      { this.props.value }
    </li>
  }

  handlerClick (event) {
    event.preventDefault()
    this.props.handlerClick(this.base)
  }

  constructor(props) {
    super(props)
    this.handlerClick = this.handlerClick.bind(this)

    this.base = this.props.base
  }
}
