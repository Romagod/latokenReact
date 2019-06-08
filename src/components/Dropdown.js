import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import styles from './Dropdown.module.css'

import ListItem from './ListItem'
import SelectItem from './SelectItem'

import * as DropDownActions from '../actions/DropDownActions'

class Dropdown extends React.Component {
  render() {
    let dropItems = []

    // render input:text field
    this.inputFilter = <input
      ref={this.inputRef}
      role="dropdown"
      type="test"
      key="input"
      onInput={this.setInputValue}
      onBlur={this.inputBlurHandler}
    />

    // render drop list items
    let filtredValue

    for (let id in this.data.items) {
      filtredValue = this.spanWrapper(this.data.items[id].value, this.data.inputValue)
      if (!filtredValue) continue

      let newItem = <ListItem
        key={id}
        base={this.data.items[id]}
        value={filtredValue}
        clickHandler={this.listItemClickHandler}
      />

      dropItems.push(newItem)
    }

    // render selected items
    let selectedItems = []

    this.value.map(item => {
      selectedItems.push(
        <SelectItem
          key={item.id}
          base={this.data.items[item.id]}
          clickHandler={this.listItemClickHandler}
        />
      )
    })

    selectedItems.push(this.inputFilter)

    let dropList = null

    if (this.data.listIsVisible)
      dropList = <ul className={ styles.test }>
      { dropItems }
    </ul>

    return <div
      role={'dropdown'}>
      <label
         onClick={this.showDropList}>
        <ul className={ styles.test }>
          { selectedItems }
        </ul>
        { dropList }
      </label>
      </div>
  }

  handlerInput(event) {
    this.props.onInput(event.target.value)
  }

  handlerChange(event) {
    this.props.onChange()
  }


  showDropList (event) {
    if (!this.data.listIsVisible) {
      document.addEventListener('click', this.hideDropList)
      this.actions.changeListVisibility(this.base.name, true)
    }
  }

  hideDropList (event) {
    let role = event.target.getAttribute('role')

    // clicking to delete button don't change drop list visibility
    if (role === 'dropdown-remove-btn') return

    let isDropdown = role ? !!~role.indexOf('dropdown') : false

    if (!isDropdown) {
      this.actions.changeListVisibility(this.base.name, false)
      document.removeEventListener('click', this.hideDropList)
      this.actions.changeInputData(this.base.name, '')
      this.inputRef.current.value = ''
    }

  }

  listItemClickHandler (item) {
    if (this.countActiveItems() < this.base.max && !item.isActive) {
      this.actions.changeSelectItem(this.base.name, item.id, true)
      this.value.push(item)
      this.props.onInput(this.value)
    } else if (this.countActiveItems()  >= this.base.max && !item.isActive) {
      return
    } else if (item.isActive) {
      this.actions.changeSelectItem(this.base.name, item.id, false)
      this.value = this.value.filter(_item => _item !== item)
      this.props.onInput(this.value)
    }
  }

  countActiveItems () {
    return this.data.activeItems.length
  }

  spanWrapper (value, search) {
    if (!search) return value

    let startPosition = value.toLowerCase().indexOf(search.toLowerCase())

    if (!~startPosition) return ''
    let offset = search.length

    let leftSide = value.substr(0, startPosition)
    let rightsSide = value.substr(startPosition + offset)
    let selectedArea = <span className={styles.selectedArea}>{value.substr(startPosition, offset)}</span>

    let result = <div role="dropdown-item">{ leftSide }{ selectedArea }{ rightsSide }</div>

    return result
  }

  setInputValue (event) {
    this.actions.changeInputData(this.base.name, event.target.value)
  }

  inputBlurHandler (event) {
    // if (!this.data.listIsVisible) {
    //   this.actions.changeListVisibility(this.base.name, false)
    //   this.actions.changeInputData(this.base.name, '')
    //   event.target.value = ''
    // }
  }

  constructor(props) {
    super(props)
    this.base = this.props.base

    this.actions = bindActionCreators(DropDownActions, this.props.dispatch)
    this.data = this.props.dropdown[this.base.name]

    this.inputRef = React.createRef()

    this.handlerInput = this.handlerInput.bind(this)
    this.handlerChange = this.handlerChange.bind(this)
    this.countActiveItems = this.countActiveItems.bind(this)
    this.spanWrapper = this.spanWrapper.bind(this)
    this.setInputValue = this.setInputValue.bind(this)
    this.inputBlurHandler = this.inputBlurHandler.bind(this)
    this.showDropList = this.showDropList.bind(this)
    this.hideDropList = this.hideDropList.bind(this)
    this.listItemClickHandler = this.listItemClickHandler.bind(this)

    this.value = []
  }
}

export default connect(state => ({
  dropdown: state.dropdown
}))(Dropdown)
