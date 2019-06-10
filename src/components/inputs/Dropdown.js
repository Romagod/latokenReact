import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import styles from './Dropdown.module.css'

import ListItem from './ListItem'
import SelectItem from './SelectItem'

import * as DropDownActions from '../../actions/DropDownActions'

class Dropdown extends React.Component {
  render() {
    let dropItems = []

    // render input:text field
    let inputFilter = <input
      role='dropdown'
      className={styles.filterInput}
      ref={this.inputRef}
      key='inputFilter'
      onInput={this.setInputValue}
    />

    // render drop list items
    let filteredValue

    for (let id in this.data.items) {
      filteredValue = this.spanWrapper(this.data.items[id].value, this.data.inputValue)
      if (!filteredValue) continue

      let newItem = <ListItem
        key={id}
        base={this.data.items[id]}
        value={filteredValue}
        handlerClick={this.listItemClickHandler}
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
          handlerClick={this.listItemClickHandler}
        />
      )
    })

    selectedItems.push(inputFilter)

    let dropList = null

    if (this.data.listIsVisible)
      dropList = <ul className={styles.droplist}>
        {dropItems}
      </ul>


    let options = []

    this.value.map(item => {
      options.push(<option value={item.value} key={item.id}>1</option>)
    })


    return <div
      role={'dropdown'}
      className={styles.componentWrapper}>
      <label
        onClick={this.showDropList}>
        <ul role='input'
            className={styles.inputWrapper}>
          {selectedItems}
          {this.value.length || this.data.listIsVisible ? '' :
            <li className={styles.placeholder}>{this.base.placeholder}</li>}
        </ul>
        {
          !this.data.listIsVisible ? '' :
            <div className={styles.droplistWrapper}
                 onScroll={this.handlerScroll}>
              <div
                ref={this.scrollRef}
                className={styles.scroller}>
              </div>
              {dropList}
            </div>
        }

        <select multiple key={this.name}
                value={this.value.map(item => item.value)}
                name={this.base.name}
                onChange={() => 0}
                className={styles.hiddenSelect}>
          {options}
        </select>

      </label>
    </div>
  }

  handlerInput(event) {
    this.methods.onInput(event.target.value)
  }

  handlerChange(event) {
    this.methods.onChange()
  }

  handlerScroll(event) {
    let clientHeight = event.target.clientHeight
    let scrollTop = event.target.scrollTop
    let scrollHeight = event.target.scrollHeight
    let scroll = this.scrollRef.current
    let scrollMargin = parseInt(window.getComputedStyle(scroll)['margin-top'])
    let scrollDelta = Math.floor(scrollTop) / (scrollHeight - clientHeight)

    this.setScrollPosition(
      (clientHeight - scroll.clientHeight - scrollMargin * 2) * scrollDelta
    )
  }

  setScrollPosition(y) {
    this.scrollRef.current.style.top = y + 'px'
  }

  showDropList(event) {
    if (!this.data.listIsVisible) {
      document.addEventListener('click', this.hideDropList)
      this.actions.changeListVisibility(this.base.name, true)
    }
  }

  hideDropList(event) {
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

  listItemClickHandler(item) {
    if (this.countActiveItems() < this.base.max && !item.isActive) {
      this.actions.changeSelectItem(this.base.name, item.id, true)
      this.value.push(item)
      this.methods.onInput(this.value)
    } else if (this.countActiveItems() >= this.base.max && !item.isActive) {
      return
    } else if (item.isActive) {
      this.actions.changeSelectItem(this.base.name, item.id, false)
      this.value = this.value.filter(_item => _item !== item)
      this.methods.onInput(this.value)
    }
  }

  countActiveItems() {
    return this.data.activeItems.length
  }

  spanWrapper(value, search) {
    if (!search) return value

    let startPosition = value.toLowerCase().indexOf(search.toLowerCase())

    if (!~startPosition) return ''
    let offset = search.length

    let leftSide = value.substr(0, startPosition)
    let rightsSide = value.substr(startPosition + offset)
    let selectedArea = <span className={styles.selectedArea}>{value.substr(startPosition, offset)}</span>

    let result = <div role="dropdown-item">{leftSide}{selectedArea}{rightsSide}</div>

    return result
  }

  setInputValue(event) {
    this.actions.changeInputData(this.base.name, event.target.value)
  }

  constructor(props) {
    super(props)
    this.base = this.props.base

    this.actions = bindActionCreators(DropDownActions, this.props.dispatch)
    this.data = this.props.dropdown[this.base.name]
    this.methods = this.props.methods
    this.options = this.props.options

    this.inputRef = React.createRef()
    this.scrollRef = React.createRef()

    this.handlerInput = this.handlerInput.bind(this)
    this.handlerChange = this.handlerChange.bind(this)
    this.countActiveItems = this.countActiveItems.bind(this)
    this.spanWrapper = this.spanWrapper.bind(this)
    this.setInputValue = this.setInputValue.bind(this)
    this.showDropList = this.showDropList.bind(this)
    this.hideDropList = this.hideDropList.bind(this)
    this.listItemClickHandler = this.listItemClickHandler.bind(this)
    this.handlerScroll = this.handlerScroll.bind(this)
    this.setScrollPosition = this.setScrollPosition.bind(this)

    this.value = []
  }
}

export default connect(state => ({
  dropdown: state.dropdown
}))(Dropdown)
