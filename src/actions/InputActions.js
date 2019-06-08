import * as types from '../constants/ActionTypes'

export function changeValue(form, name, value) {
  return {
    type: types.CHANGE_VALUE,
    form,
    name,
    value
  }
}

export function addInput(form, name) {
  return {
    type: types.ADD_INPUT,
    form,
    name
  }
}

export function addError(form, name, id, errorMessage) {
  return {
    type: types.ADD_ERROR,
    form,
    name,
    errorMessage,
    id
  }
}

export function addForm(form, submitCallBack) {
  return {
    type: types.ADD_FORM,
    submitCallBack,
    form
  }
}

export function deleteError(form, name, id) {
  return {
    type: types.DELETE_ERROR,
    form,
    name,
    id
  }
}

export function changeStatus(form, name, status) {
  return {
    type: types.CHANGE_STATUS,
    form,
    name,
    status
  }
}
