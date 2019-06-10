import React from 'react'
import styles from './Main.module.css'


export default class Main extends React.Component {
  render() {
    return (
      <main className={styles.main}>
        <div className={styles.content}>
          { this.props.children }
        </div>
      </main>
    )
  }

  constructor(props) {
    super(props)
    this.base = this.props.base
    this.data
  }
}
