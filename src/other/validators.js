export function validatorLength (errorMessage) {
  return function (value, base) {
    return {
      result: Object.keys(value).length <= base.max,
      name: 'validatorLength',
      errorMessage: errorMessage || 'Field value is too long'
    }
  }
}

export function validatorSiteUrl (errorMessage) {
  console.log(this)
  return function (value) {
    return {
      result: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(value) || value === '',
      name: 'validatorSiteUrl',
      errorMessage: errorMessage || 'It now valid site URL'
    }
  }
}

export function validatorVideoUrl (errorMessage) {
  console.log(this)
  return function (value) {
    return {
      result: /^(https?:\/\/)?((www\.)?(youtube|vimeo)\.com|youtu\.?be)\/.+$/.test(value) || value === '',
      name: 'validatorSiteUrl',
      errorMessage: errorMessage || 'It now valid site URL'
    }
  }
}

export function validatorRequired (errorMessage) {
  return function (value) {
    return {
      result: !!Object.keys(value).length,
      name: 'validatorRequired',
      errorMessage: errorMessage || 'Field is required'
    }
  }
}

export function validatorTrue () {
  return function (value, base) {
    return {
      result: true,
      name: 'validatorTrue',
      errorMessage: ''
    }
  }
}

export function validatorMimeTypes (options = {}) {
  return function (value, base) {
    return {
      result: !!~base.validTypes.indexOf(value),
      name: 'validatorMimeTypes',
      errorMessage: options.errorMessage || 'Type is not valid'
    }
  }
}

export function validatorMaxFileSize (options = {}) {
  return function (value, base) {
    return {
      result: value <= base.maxFileSize,
      name: 'validatorMaxFileSize',
      errorMessage: options.errorMessage || 'File is too big'
    }
  }
}

export function validatorCountFile (options = {}) {
  return function (value, base) {
    let max = base.multiple ? base.max : 1

    return {
      result: value < max,
      name: 'validatorCountFile',
      errorMessage: options.errorMessage || 'Max items count'
    }
  }
}


