import * as types from '../constants/ActionTypes';

const initialState = {
  activeItem: '1-1',
  menu: {
    1: { id: '1', isActive: true, isVisible: true, name: 'Project info', menu: {
      1: {id: '1-1', isActive: true, isVisible: true, name: 'General', menu: {} },
      2: {id: '1-2', isActive: false, isVisible: true, name: 'Fundraising', menu: {} },
      3: {id: '1-3', isActive: false, isVisible: true, name: 'Previous rounds', menu: {} },
      4: {id: '1-4', isActive: false, isVisible: true, name: 'Roadmap', menu: {} },
      5: {id: '1-5', isActive: false, isVisible: true, name: 'Partnerships', menu: {} },
    }},
    2: { id: '2', isActive: false, isVisible: true, name: 'Team', menu: {} },
    4: { id: '4', isActive: false, isVisible: true, name: 'Product', menu: {} },
    5: { id: '5', isActive: false, isVisible: true, name: 'Financials', menu: {} },
    6: { id: '6', isActive: false, isVisible: true, name: 'Risks', menu: {} },
    7: { id: '7', isActive: false, isVisible: true, name: 'Data', menu: {} },
    8: { id: '8', isActive: false, isVisible: true, name: 'Reviews', menu: {} },
    9: { id: '9', isActive: false, isVisible: true, name: 'FAQ', menu: {} },
    10: { id: '10', isActive: false, isVisible: true, name: 'Mentions', menu: {} }
  }
}

export default function menu(state = initialState, action) {
  switch (action.type) {
    case types.SET_ACTIVE:
      return Object.assign({}, {
        activeItem: action.id,
        menu: (() => {
          let previousActiveItems = state.activeItem.split('-').reverse()
          let activeItems = action.id.split('-').reverse()

          let menu  = Object.assign({}, state.menu)
          let current = menu
          let id

          while (id = previousActiveItems.pop()) {
            current[id].isActive = false

            for (let key in current) {
              current[key].isVisible = false
            }

            for (let key in current[id].menu) {
              current[id].menu[key].isVisible = false
            }

            current = current[id].menu
          }

          current = menu

          while (id = activeItems.pop()) {
            current[id].isActive = true

            for (let key in current) {
              current[key].isVisible = true
            }

            for (let key in current[id].menu) {
              current[id].menu[key].isVisible = true
            }

            current = current[id].menu
          }

          return menu
        })()

      })

    default:
      return state;
  }
}

