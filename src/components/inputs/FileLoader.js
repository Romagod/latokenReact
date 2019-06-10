import React, {Component} from 'react'

import styles from './FileLoader.module.css'

import {validatorMimeTypes, validatorMaxFileSize, validatorCountFile} from '../../other/validators'

import {INPUT_DEFAULT, INPUT_SUCCESS} from "../../containers/InputApp"
import FileList from "./FileList"

export default class FileLoader extends React.Component {
  render() {
    this.constructFormData()


    return <div className={styles.wrapper}>
      {/*render drop area for if value container is not full*/}
      {this.options.hideOnFull && Object.keys(this.value).length >= this.base.max ? '' :
        <div role='input'
             className={styles.fileloader}
             onDrag={this.prevent}
             onDragLeave={this.prevent}
             onDragOver={this.prevent}
             onDrop={this.handlerDrop}>
          <div className={styles.info}>

            {/*render icon on success load */}
            <div className={`
            ${styles.icon}
            ${this.data.status === INPUT_SUCCESS ? styles.iconSuccess : ''} 
          `}>
            </div>

            {/*render placeholder*/}
            <div className={styles.placeholder}>
              {this.data.status === INPUT_SUCCESS ? 'Uploaded' : this.options.placeholder}
            </div>

          </div>

          {/*render reset button if file loader option is not multiple*/}
          {this.base.multiple || !Object.keys(this.value).length ? '' :
            <div onClick={this.handlerRemove}
                 className={styles.reset}
            />
          }
        </div>
      }

      {/*render file list if file loader has diplayFiles option*/}
      {!this.options.displayFiles ? '' :
        <FileList
          base={''}
          methods={{
            changeOption: this.methods.changeOption,
            removeFile: this.handlerRemove
          }}
          data={this.value}
        />
      }

      {/*render hidden file loader input*/}
      <input type="file"
             name={this.base.name}
             ref={this.refInputFile}
             className={styles.inputFileHidden}
      />
    </div>

  }

  // prevent to default some drag events
  prevent(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  // handler drop event
  handlerDrop(event) {
    event.preventDefault()
    event.stopPropagation()

    // exit if count limit exceeded
    if (!this.base.multiple && Object.keys(this.value).length >= 1 ||
      Object.keys(this.value).length >= this.base.max) {
      return
    }

    // init data transfer for file load
    let dt = event.dataTransfer
    let files = dt.files

    // validation input file
    let mimeTypeCheck, fileSizeCheck, maxFileCountCheck

    ;[].map.call(files, file => {

      // mime-type check
      mimeTypeCheck = this.check.mimeType(file.type, this.base)

      if (!mimeTypeCheck.result) {
        this.methods.addError(mimeTypeCheck)
        return
      }

      // file-size check
      fileSizeCheck = this.check.size(file.size, this.base)

      if (!fileSizeCheck.result) {
        this.methods.addError(fileSizeCheck)
        return
      }

      // max items check
      maxFileCountCheck = this.check.max(Object.keys(this.value).length, this.base)

      if (!maxFileCountCheck.result) {
        this.methods.addError(maxFileCountCheck)
        return
      }

      this.handlerChange(file)
    })
  }

  // add new file to store
  handlerChange(file) {
    file.id = Math.random().toString(16).slice(2)
    this.value[file.id] = file
    this.methods.onChange(this.value)
    // change component status
    if (this.options.highlightingOnSuccess) {
      this.methods.changeStatus(INPUT_SUCCESS)
    }
  }

  // delete all loaded elements or delete single element by id
  handlerRemove(id) {
    if (typeof id === 'object') {
      this.value = {}
    } else {
      delete this.value[id]
    }

    // change component status
    if (this.options.highlightingOnSuccess) {
      this.methods.changeStatus(INPUT_DEFAULT)
    }

    // delete value from store
    this.methods.onChange(this.value)
  }

  // construct data for form
  constructFormData () {
    let dt = new DataTransfer()

    for (let key in this.value) {
      dt.items.add(this.value[key])
    }

    if (Object.keys(dt.files).length) {
      this.refInputFile.current.files = dt.files
    }
  }

  constructor(props) {
    super(props)
    this.base = this.props.base
    this.data = this.props.data
    this.options = this.props.options
    this.methods = this.props.methods

    this.prevent = this.prevent.bind(this)
    this.handlerDrop = this.handlerDrop.bind(this)
    this.handlerRemove = this.handlerRemove.bind(this)
    this.constructFormData  = this.constructFormData .bind(this)

    // link to hidden input file
    this.refInputFile = React.createRef()

    // init default value
    this.value = {}

    // init validators
    this.check = {
      mimeType: validatorMimeTypes({}),
      size: validatorMaxFileSize({}),
      max: validatorCountFile({})
    }
  }
}

