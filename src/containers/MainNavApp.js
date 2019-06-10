import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as MainNavActions from '../actions/MainNavActions'

import MainNavItem from '../components/sidebar/MainNavItem'

class MainNavApp extends Component {
  constructor (props) {
    super(props)

    this.data = this.props.mainNav
    this.base = this.props.base
    this.actions = bindActionCreators(MainNavActions, this.props.dispatch)

    this.getData = this.getData.bind(this)

    this.getData()
  }

  getData () {
    fetch(this.base.url, {
      method: 'post'
    }).then(data => {
      if (data.status !== 200) {
        throw new Error('Not 200 response')
      } else {
        this.serverData = data
      }
    }).catch(() => {
      this.serverData = [
        {title: 'Project info', href: '#', items: [
          {title: 'General', href: '#', items: []},
          {title: 'Fundraising', href: '#', items: []},
          {title: 'Previous rounds', href: '#', items: []},
          {title: 'Roadmap', href: '#', items: []},
          {title: 'Partnerships', href: '#', items: []}
        ]},
        {title: 'Team', href: '#', items: []},
        {title: 'Product', href: '#', items: []},
        {title: 'Financials', href: '#', items: []},
        {title: 'Risks', href: '#', items: []},
        {title: 'Data', href: '#', items: []},
        {title: 'Reviews', href: '#', items: []},
        {title: 'FAQ', href: '#', items: []},
        {title: 'Mentions', href: '#', items: []},
      ]
    }).then(() => {
      this.actions.initMenu(this.serverData)
      this.data = this.props.mainNav
      this.actions.setActive('0-0')
    })
  }

  render () {
    return (
      <nav>
        <MainNavItem
          data={this.data.items || null}
          actions={{
            setActive: this.actions.setActive
          }}/>
      </nav>
    )
  }
}

const mapStateToProps = state => ({ mainNav: state.mainNav })

export default connect(mapStateToProps)(MainNavApp)
