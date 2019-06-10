import * as types from '../constants/ActionTypes';

const initialState = {

}

export default function input(state = initialState, action) {
  let result = {}
  switch (action.type) {
    case types.CHANGE_VALUE:
      Object.assign(result, state)
      result[action.form][action.name].value = action.value

      return result

    case types.ADD_INPUT:
      let emptyInput = {[action.name]: {
        value: '',
        errors: {},
        status: 'INPUT_DEFAULT',
        option: {}
      }}

      Object.assign(result, state)
      Object.assign(result[action.form], emptyInput)

      return result

    case types.CHANGE_STATUS:
      Object.assign(result, state)
      result[action.form][action.name].status = action.status

      return result

    case types.ADD_ERROR:
      Object.assign(result, state)
      Object.assign(result[action.form][action.name].errors, {[action.id]: action.errorMessage})

      return result

    case types.DELETE_ERROR:
      Object.assign(result, state)
      delete result[action.form][action.name].errors[action.id]

      return result

    case types.ADD_FORM:
      return Object.assign({[action.form]: {submit: action.submitCallBack}}, state)

    case types.CHANGE_OPTION:
      Object.assign(result, state)
      result[action.form][action.name].option = action.option
      return result

    default:
      return state;
  }
}
