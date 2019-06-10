import * as types from '../constants/ActionTypes'

export function setUser(name, email) {
  return {
    type: types.USER_SET,
    name,
    email
  }
}
