import * as types from '../constants/ActionTypes'

export function setActive(id) {
  return {
    type: types.SET_ACTIVE,
    id
  }
}
