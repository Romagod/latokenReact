import * as types from '../constants/ActionTypes';

const initialState = {
    name: 'Bruce',
    surname: 'Wayne',
    email: ''
}

export default function user(state = initialState, action) {
  let result = {}
  switch (action.type) {
    case types.USER_SET:
      Object.assign(result, state)
      result.name = action.name
      result.email = action.email
      return state
    default:
      return state
  }
}
