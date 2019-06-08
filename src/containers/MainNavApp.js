import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as MainNavActions from '../actions/MainNavActions'

import MainNavItem from '../components/MainNavItem'

class MainNavApp extends Component {
  render () {
    const { menu, dispatch } = this.props
    const actions = bindActionCreators(MainNavActions, dispatch)

    return (
      <nav>
        <MainNavItem
          setactive={actions.setActive}
          menu={menu.menu}/>
      </nav>
    )
  }

  constructor (props) {
    super(props)
    console.log(this.props)
  }
}

export default connect(state => ({
  menu: state.menu
}))(MainNavApp)
