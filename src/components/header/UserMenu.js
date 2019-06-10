import React from 'react'
import style from './UserManu.module.css'
import {connect} from "react-redux"

class UserMenu extends React.Component {
  render() {
    return (
      <div className={style.userMenu}>
        <div className={style.userInfo}>
          {this.data.name} {this.data.surname}
        </div>
        <a href={'#'}>
          <div className={style.auth}/>
        </a>
      </div>
    )
  }

  constructor(props) {
    super(props)
    this.base = this.props.base
    this.data = this.props.user
  }
}

const mapStateToProps = state => ({user: state.user})

export default connect(mapStateToProps)(UserMenu)
