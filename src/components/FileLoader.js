import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import styles from './FileLoader.module.css'

import { validatorMimeTypes, validatorMaxFileSize, validatorCountFile } from '../other/validators'

import * as FileLoaderActions from '../actions/FileLoaderActions'

class FileLoader extends React.Component {
  render () {
    return <div
      className={styles.droparea}
      onDrag={this.prevent}
      onDragLeave={this.prevent}
      onDragOver={this.prevent}
      onDrop={this.handlerDrop}
    >
      DropArea
      <div>
        { this.options.placeholder }
      </div>
      <div onClick={this.handlerRemove}>R</div>
    </div>

  }

  prevent (event) {
    event.preventDefault()
    event.stopPropagation()
  }

  handlerDrop (event) {
    event.preventDefault()
    event.stopPropagation()

    let dt = event.dataTransfer
    let files = dt.files

    let mimeTypeCheck, fileSizeCheck, maxFileCountCheck

    ;[].map.call(files, item => {

      // mime-type check
      mimeTypeCheck = this.check.mimeType(item.type, this.base)

      if (!mimeTypeCheck.result) {
        this.props.addError('test-1', mimeTypeCheck.errorMessage)
        return
      }

      // file-size check
      fileSizeCheck = this.check.size(item.size, this.base)

      if (!fileSizeCheck.result) {
        this.props.addError('test-2', fileSizeCheck.errorMessage)
        return
      }

      // max items check
      maxFileCountCheck = this.check.max(this.value.length, this.base)

      if (!maxFileCountCheck.result) {
        this.props.addError('test-3', maxFileCountCheck.errorMessage)
        return
      }

      this.value.push(item)
      this.props.onInput(this.value)

    })
  }

  handlerRemove () {
    this.value = []
  }

  constructor(props) {
    super(props)
    this.base = this.props.base
    this.options = this.props.options

    this.prevent = this.prevent.bind(this)
    this.handlerDrop = this.handlerDrop.bind(this)
    this.handlerRemove = this.handlerRemove.bind(this)

    this.actions = bindActionCreators(FileLoaderActions, this.props.dispatch)
    this.actions.addFileLoader(this.base.name)

    this.value = []

    this.check = {
      mimeType: validatorMimeTypes({}),
      size: validatorMaxFileSize({}),
      max: validatorCountFile({})
    }
  }
}

export default connect(state => ({
  fileloader: state.fileloader
}))(FileLoader)
