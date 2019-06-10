import React from 'react'
import styles from './Header.module.css'

import logo from '../../assets/images/logo.svg'

export default class Header extends React.Component {
  render() {
    return (
      <header className={styles.mainHeader}>
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <img src={logo}
                 alt={this.base.alt}
                  className={styles.image}/>
            <div className={styles.title}> { this.base.title } </div>
          </div>
          { this.props.children }
        </div>
      </header>
    )
  }

  constructor(props) {
    super(props)
    this.base = this.props.base
  }
}
