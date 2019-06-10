import React, {Component} from 'react'

import styles from './FileList.module.css'

import docImg from '../../assets/images/document.svg'

export default class FileList extends React.Component {
  render() {
    let filelist = []
    let isImage = false

    for (let file in this.data) {
      isImage = !!~this.data[file].type.indexOf('image')

      if (!this.images[file] && isImage) {
        this.getBase64(this.data[file])
        continue
      }

      filelist.push(
        <li className={styles.item}
        key={file + 'item'}>
          <div className={styles.imageWrapper}
               key={file + 'wrapper'}>
            <img className={isImage ? styles.image : styles.imageStub}
                 key={file + 'img'}
                 src={isImage ? this.images[this.data[file].id] : docImg}
                 alt="file image"
            />
          </div>

          <div className={styles.fileName}
               key={file + 'filename'}>
            {this.data[file].name}
          </div>

          <div className={styles.removeItem}
               key={file + 'remove'}
               data-id={file}
               onClick={this.handlerClick}/>

        </li>
      )
    }

    return <ul className={styles.fileList}>
      {filelist}
    </ul>
  }

  getBase64(image) {
    let reader = new FileReader()

    reader.onload = () => {
      this.images[image.id] = reader.result
      this.methods.changeOption(this.images)
    }

    reader.readAsDataURL(image)
  }

  handlerClick(event) {
    let id = event.target.getAttribute('data-id')
    delete this.images[id]
    this.methods.removeFile(id)
    this.methods.changeOption(this.images)
  }

  constructor(props) {
    super(props)
    this.base = this.props.base
    this.data = this.props.data
    this.options = this.props.options
    this.methods = this.props.methods

    this.getBase64 = this.getBase64.bind(this)
    this.handlerClick = this.handlerClick.bind(this)

    this.images = {}
  }
}

