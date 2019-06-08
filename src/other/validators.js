export function validatorLength (options) {
  return function (value, base) {
    return {
      result: Object.keys(value).length <= base.max,
      name: 'validatorLength',
      errorMessage: options.errorMessage || 'Field value is too long'
    }
  }
}

export function validatorFalse (options = {}) {
  return function (value) {
    return {
      result: false,
      name: 'validatorFalse',
      errorMessage: options.errorMessage || 'Test false validator'
    }
  }
}

export function validatorTest (options = {}) {
  return function (value) {
    console.log('TEST VALIDATOR')
    return {
      result: value === 'true',
      name: 'validatorTest',
      errorMessage: options.errorMessage || 'Test validator'
    }
  }
}


export function validatorRequired (options = {}) {
  return function (value) {
    return {
      result: !!Object.keys(value).length,
      name: 'validatorRequired',
      errorMessage: options.errorMessage || 'Field is required'
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


