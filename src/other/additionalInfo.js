export function infoSymbolsCount(title) {
  return function (value, options) {
    return {
      title: title,
      info: `${value.length}/${options.max}`
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

export function infoStatic(data) {
  return function () {
    return {
      title: data.title || '',
      info: data.info || ''
    }
  }
}
