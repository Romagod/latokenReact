import React from 'react'
import styles from './MainHeader.module.css'
import {connect} from "react-redux"


class MainHeader extends React.Component {
  // render main header (in main tag)
  render() {
    return (
      <div className={styles.mainHeader}>
        <h2 className={styles.greetings}>
          {/*render user name got form store*/}
          Hi, { this.data.name }!
        </h2>
        {/*render welcome message*/}
        <div className={styles.message}>
          Let's fill out the general information about your project
        </div>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.base = this.props.base
    this.data = this.props.user
  }
}

const mapStateToProps = state => ({ user: state.user })

export default connect(mapStateToProps)(MainHeader)
