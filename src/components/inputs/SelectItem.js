import React, { Component } from 'react'
import styles from './SelectItem.module.css'

export default class SelectItem extends React.Component {
  render() {
    // render selected drop list item
    return <li
      role="dropdown-item"
      className={styles.selectItem}>
      <div className={styles.caption}>
        { this.base.value }
      </div>
      <div
        role="dropdown-remove-btn"
        className={styles.removeButton}
        onClick={this.handlerClick}/>
    </li>
  }

  // remove selected item by click
  handlerClick (event) {
    event.stopPropagation()
    event.preventDefault()

    this.props.handlerClick(this.base)
  }


  constructor(props) {
    super(props)
    this.handlerClick = this.handlerClick.bind(this)

    this.base = this.props.base
  }
}
