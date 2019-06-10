import React, { Component } from 'react'
import styles from './MainNavItem.module.css'

export default class MainNavItem extends React.Component {
  constructor(props) {
    super(props)

    this.actions = this.props.actions
    this.handlerClick = this.handlerClick.bind(this)
  }

  render() {
    this.data = this.props.data

    if (!this.data) return null

    let menuItems = []
    let currentItem = []

    this.data.map(item => {
      if (!item.isVisible) return

      currentItem.push(<div
        key={item.id + 'div'}
        className={`
          ${styles.item} 
          ${item.isActive ? styles.itemActive : ''}
        `}
        data-id={item.id}
        onClick={this.handlerClick}
      > { item.title } </div>)

      if (item.items) {
        currentItem.push(
          <MainNavItem data={item.items} actions={{setActive: this.actions.setActive}} key={item.id + 'item'}/>
        )
      }

      menuItems.push(<li key={item.id + 'li'}> { currentItem } </li>)

      currentItem = []
    })

    return <ul className={styles.menu}> { menuItems } </ul>
  }

  handlerClick (event) {
    event.stopPropagation()
    this.actions.setActive(event.target.getAttribute('data-id'))
  }
}
