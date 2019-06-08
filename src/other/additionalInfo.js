export function infoSymbolsCount(title) {
  return function (value, base) {
    return {
      title: title,
      info: `${value.length}/${base.max}`
    }
  }
}

export function maxItems(title) {
  return function (value, base) {
    return {
      title: title,
      info: `Max ${base.max}`
    }
  }
}


export function infoFileNames(title = '') {
  return function (value, base) {
    let result = ''

    // if (typeof value === 'Object')
    // value.map(item => result += item.name)

    return {
      title: title,
      info: result
    }
  }
}
