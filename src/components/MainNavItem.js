import React, { Component } from 'react'

export default class MainNavItem extends React.Component {
  render() {
    let items = []

    for (let id in this.props.menu) {
      let currentItem = this.props.menu[id]

      if (!currentItem.isVisible) continue

      let submenu = null

      if (currentItem.menu) {
         submenu = <MainNavItem
          menu={currentItem.menu}
          setactive={this.props.setactive}
         />
      }

      items.push(<li
        key={currentItem.id}
      >
        <div
          onClick={this.handlerClick}
          data-id={currentItem.id}
        > {currentItem.name} </div>
        { submenu }
      </li>)


    }

    return <ul> { items } </ul>
  }

  handlerClick (event) {
    event.stopPropagation()
    this.props.setactive(event.target.getAttribute('data-id'))
  }

  constructor(props) {
    super(props)
    this.handlerClick = this.handlerClick.bind(this)
  }
}
