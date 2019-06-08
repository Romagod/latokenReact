import * as types from '../constants/ActionTypes'

export function changeSelectItem(name, itemId, status) {
  return {
    type: types.CHANGE_SELECT_ITEM,
    name,
    itemId,
    status
  }
}

export function addItem(name, value) {
  return {
    type: types.ADD_ITEM,
    name,
    value
  }
}

export function addDropList(name) {
  return {
    type: types.ADD_DROPLIST,
    name,
  }
}

export function changeListVisibility(name, status) {
  return {
    type: types.CHANGE_LIST_VISIBILITY,
    name,
    status
  }
}

export function changeInputData(name, value) {
  return {
    type: types.CHANGE_INPUT_DATA,
    name,
    value
  }
}

