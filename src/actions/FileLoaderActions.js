import * as types from '../constants/ActionTypes'

export function addFileLoader(name) {
  return {
    type: types.ADD_FILE_LOADER,
    name
  }
}

export function addFile(name, id, content) {
  return {
    type: types.ADD_FILE,
    name,
    id,
    content
  }
}

export function deleteFile(name, id) {
  return {
    type: types.DELETE_FILE,
    name,
    id
  }
}
