import React from 'react'

import styles from './Sidebar.module.css'

export default class Sidebar extends React.Component {
  render() {
    return <aside className={styles.sidebar}>{this.props.children}</aside>
  }

  constructor(props) {
    super(props)
    this.base = this.props.base
  }
}
