import * as types from '../constants/ActionTypes'

export function setActive(id) {
  return {
    type: types.MENU_SET_ACTIVE,
    id
  }
}

export function addItem(item, parentId = null) {
  return {
    type: types.MENU_ADD_ITEM,
    item,
    parentId
  }
}

export function initMenu(menu) {
  return {
    type: types.MENU_INIT,
    menu
  }
}
