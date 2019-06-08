import * as types from '../constants/ActionTypes';

const initialState = {
  'dropdown': {
    activeItems: [],
    inputValue: '',
    listIsVisible: false,
    items: {
      1: {value: 'Agribusiness', id: 1, isActive: false},
      2: {value: 'Agricultural Services & Products', id: 2, isActive: false},
      3: {value: 'Auto Dealers, Japanese', id: 3, isActive: false},
      4: {value: 'Auto Manufacturers', id: 4, isActive: false},
      5: {value: 'Banks, Savings & Loans', id: 5, isActive: false},
      6: {value: 'Books, Magazines & Newspapers', id: 6, isActive: false},
      7: {value: 'Broadcasters, Radio/TV', id: 7, isActive: false},
      8: {value: 'Builders/Residential', id: 8, isActive: false},
      9: {value: 'Building Materials & Equipment', id: 9, isActive: false},
      10: {value: 'Construction Services', id: 10, isActive: false},
      11: {value: 'Credit Unions', id: 11, isActive: false},
      12: {value: 'Crop Production & Basic Processing', id: 12, isActive: false},
      13: {value: 'Cruise Ships & Lines', id: 13, isActive: false},
    }
  }
}

export default function input(state = initialState, action) {
  let result = {}
  switch (action.type) {
    case types.ADD_ITEM:
      Object.assign(result, state)
      Object.assign(result[action.name], {[action.itemId]: action.value})
      return state

    case types.ADD_DROPLIST:
      result = {name: action.name}
      Object.assign(result, state)
      return result

    case types.CHANGE_INPUT_DATA:
      Object.assign(result, state)
      result[action.name].inputValue = action.value
      return result

    case types.CHANGE_SELECT_ITEM:
      Object.assign(result, state)
      Object.assign(result[action.name].items[action.itemId], {isActive: action.status})

      if (action.status) {
        result[action.name].activeItems.push(action.itemId)
      } else {
        result[action.name].activeItems = result[action.name].activeItems.filter(item => item !== action.itemId)
      }

      return result

    case types.CHANGE_LIST_VISIBILITY:
      Object.assign(result, state)
      result[action.name].listIsVisible = action.status

      return result

    default:
      return state
  }
}
