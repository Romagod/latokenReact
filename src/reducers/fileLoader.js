import * as types from '../constants/ActionTypes';

const initialState = {

}

export default function input(state = initialState, action) {
  let result = {}
  switch (action.type) {
    case types.ADD_FILE_LOADER:
      Object.assign(result, state)
      Object.assign(result, {[action.name]: {}})
      return result

    case types.ADD_FILE:
      result = {name: action.name}
      Object.assign(result, state)
      return result

    default:
      return state
  }
}
