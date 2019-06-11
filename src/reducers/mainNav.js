import * as types from '../constants/ActionTypes'

const initialState = {
  activeItem: '1-1',
  items: [
    {id: '1', title: 'Project info', isVisible: false, isActive: false, href:'#', items: [
        {id: '1-1', title: 'General', isVisible: false, isActive: false, href:'#', items: []},
        {id: '1-2', title: 'Fundraising', isVisible: false, isActive: false, href:'#', items: []}
    ]},
    {id: '2', title: 'Project info', isVisible: false, isActive: false, href: '#', items: []}
  ]

}

export default function menu(state = {}, action) {
  let result = {}
  switch (action.type) {
    case types.MENU_INIT:
      result.activeItem = ''
      result.items = action.menu
      init(result.items)

      return result

    case types.MENU_SET_ACTIVE:
      Object.assign(result, state)

      setActive(result.items, state.activeItem, false)
      setActive(result.items, action.id, true)

      result.activeItem = action.id

      return result

    default:
      return state
  }
}

/**
 * Set default values for properties: id, isVisible, isActive
 * @param {Array} menu object with properties: title, href and children
 * @param {String} parentId parent menu identifier
 */
function init(menu, parentId = '') {
  menu.map((item, index) => {
    item.id = parentId ? parentId + '-' + (parseInt(index)) : (parseInt(index)) + ''
    item.isVisible = !~item.id.indexOf('-')
    item.isActive = false

    if (item.items) init(item.items, item.id)
  })
}

/**
 * Set active and visibility property for an element with received id and all its parent
 * @param {Array} menu array containing a looking identifier
 * @param {String|Array} id target element identifier
 * @param {Boolean} status visibility status
 */
function setActive (menu, id, status) {
  let index

  if (typeof id === 'string') {
    id = id.split('-').reverse()
  }

  if (id[0] !== '' && id[0] !== undefined) {
    index = id.pop()

    menu[index].isActive = status
    menu[index].items.map(item => item.isVisible = status)
    if (id[0]) setActive(menu[index].items, id, status)
  }
}
