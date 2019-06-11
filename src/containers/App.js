import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import {Provider} from 'react-redux';

require("../assets/css/style.css")

import {
  validatorLength,
  validatorRequired,
  validatorSiteUrl,
  validatorTrue,
  validatorVideoUrl
} from "../other/validators"

import * as reducers from '../reducers';
import * as additionalInfo from '../other/additionalInfo'

import MainNavApp from "./MainNavApp"
import Sidebar from "../components/sidebar/Sidebar"
import InputWrapper from "./InputApp"
import InputText from "../components/inputs/InputText"
import Form from "../components/inputs/Form"
import Dropdown from "../components/inputs/Dropdown"
import FileLoader from "../components/inputs/FileLoader"
import Header from "../components/header/Header"
import UserMenu from "../components/header/UserMenu"
import Main from "../components/main/Main"
import MainHeader from "../components/main/MainHeader"

import styles from './App.module.css'

const reducer = combineReducers(reducers)
export const store = createStore(reducer)

export default class App extends Component {
  render() {
    // create inputs element based on input wrapper
    let InputTextField = InputWrapper(InputText, 'projectform')
    let InputDropdown = InputWrapper(Dropdown, 'projectform')
    let InputFileLoader = InputWrapper(FileLoader, 'projectform')

    return (
      <div className={styles.app}>
        <Provider store={store}>
          <Header
            base={{
              alt: 'logo',
              title: 'IEO Launchpad'
            }}
          >
            <UserMenu/>
          </Header>
          <div className={styles.contentWrapper}>
            <Sidebar>
              <MainNavApp
                base={{
                  url: '/'
                }}
              />
            </Sidebar>
            <Main>
              <MainHeader/>
              <Form
                base={{
                  action: '/',
                  name: 'projectform'
                }}
              >

                <InputTextField
                  base={{
                    name: 'project-name',
                    id: 'project-name',
                    placeholder: 'Your project name',
                    required: true,
                    max: 50
                  }}
                  options={{
                  }}
                  validators={{
                    input: [validatorLength()],
                    submit: [validatorRequired('Every project needs a name, doesn’t it?')]
                  }}
                  info={additionalInfo.infoSymbolsCount('Project name')}
                />

                <InputTextField
                  base={{
                    name: 'short-description',
                    id: 'short-description',
                    placeholder: 'Short description of the project',
                    required: true,
                    max: 40
                  }}
                  options={{
                    type: 'text' // !!
                  }}
                  validators={{
                    input: [validatorLength()],
                    submit: [validatorRequired('Please write something here')]
                  }}
                  info={additionalInfo.infoSymbolsCount(
                    <span>Short description (see examples for popular projects on <a href="#"> Techcrunch</a>)</span>
                  )}
                />

                <InputTextField
                  base={{
                    name: 'website',
                    id: 'website',
                    placeholder: 'Your project website',
                    required: true
                  }}
                  options={{

                  }}
                  validators={{
                    change: [validatorSiteUrl()],
                    submit: [validatorRequired('It can not be that you don’t have a website')]
                  }}
                  info={additionalInfo.infoStatic({
                    title: 'Website'
                  })}
                />

                <InputTextField
                  base={{
                    name: 'full-description',
                    id: 'full-description',
                    placeholder: 'Describe your project in 1000 symbols',
                    required: true,
                    max: 1000
                  }}
                  options={{
                    type: 'textarea'
                  }}
                  validators={{
                    input: [validatorLength()],
                    submit: [validatorRequired('It can not be that you don’t have a website')]
                  }}
                  info={additionalInfo.infoSymbolsCount('Full project description')}
                />

                <InputDropdown
                  base={{
                    name: 'dropdown',
                    id: 'dropdown',
                    source: '/droplistdata',
                    required: true,
                    placeholder: 'Choose up to 3 undustries that describes your project the best',
                    max: 3
                  }}
                  validators={{
                    submit: [validatorRequired('Select at least one industry')]
                  }}
                  info={additionalInfo.maxItems('Industries')}
                />
                <div className={styles.documentWrapper}>

                {/*<InputFileLoader*/}
                {/*  base={{*/}
                {/*    name: 'pdf-loader-1',*/}
                {/*    id: 'pdf-loader-1',*/}
                {/*    multiple: false,*/}
                {/*    validTypes: ['application/pdf'],*/}
                {/*    max: 3,*/}
                {/*    maxFileSize: 52428800*/}
                {/*  }}*/}
                {/*  options={{*/}
                {/*    highlightingOnSuccess: true,*/}
                {/*    placeholder: 'PDF, up to 50Mb',*/}
                {/*    displayFiles: false,*/}
                {/*    hideOnFull: false*/}
                {/*  }}*/}
                {/*  validators={{*/}
                {/*    change: [validatorTrue()]*/}
                {/*  }}*/}
                {/*  info={additionalInfo.infoStatic({*/}
                {/*    title: 'Whitepaper'*/}
                {/*  })}*/}
                {/*/>*/}

                {/*  <InputFileLoader*/}
                {/*    base={{*/}
                {/*      name: 'pdf-loader-2',*/}
                {/*      id: 'pdf-loader-2',*/}
                {/*      multiple: false,*/}
                {/*      validTypes: ['application/pdf'],*/}
                {/*      required: true,*/}
                {/*      max: 3,*/}
                {/*      maxFileSize: 52428800*/}
                {/*    }}*/}
                {/*    options={{*/}
                {/*      highlightingOnSuccess: true,*/}
                {/*      placeholder: 'PDF, up to 50Mb',*/}
                {/*      displayFiles: false,*/}
                {/*      hideOnFull: false // !!*/}
                {/*    }}*/}
                {/*    validators={{*/}
                {/*      submit: [validatorRequired('No pitch deck? Do you even know where you are?')]*/}
                {/*    }}*/}
                {/*    info={additionalInfo.infoStatic({*/}
                {/*      title: <span>Pitch deck (see <a href="#">template</a>)</span>*/}
                {/*    })}*/}
                {/*  />*/}

                </div>

                <InputFileLoader
                  base={{
                    name: 'image-loader',
                    id: 'image-loader',
                    multiple: true,
                    validTypes: ['image/png', 'image/jpeg'],
                    required: true,
                    max: 8,
                    maxFileSize: 5242880
                  }}
                  options={{
                    highlightingOnSuccess: false,
                    placeholder: 'PNG or JPG, min 800×600 px, up to 5 Mb',
                    displayFiles: true,
                    hideOnFull: true // !!
                  }}
                  validators={{
                    submit: [validatorRequired()]
                  }}
                  info={additionalInfo.infoStatic({
                    title: 'Images about project',
                    info: 'Max 8, at least one required'
                  })}
                />


                <InputTextField
                  base={{
                    name: 'video-1',
                    id: 'video-1',
                    placeholder: 'Youtube or Vimeo link',
                    required: false,
                  }}
                  options={{
                    type: 'text'
                  }}
                  validators={{
                    change: [validatorVideoUrl('Whatever it is, this is definitely not a link to the video')],
                  }}
                  info={additionalInfo.infoStatic({
                    title: 'Videos about project',
                    info: 'Up to 2 videos, not required'
                  })}
                />

                <InputTextField
                  base={{
                    name: 'video-2',
                    id: 'video-2',
                    placeholder: 'Youtube or Vimeo link',
                    required: false,
                  }}
                  options={{
                    type: 'text'
                  }}
                  validators={{
                    change: [validatorVideoUrl('Whatever it is, this is definitely not a link to the video')],
                  }}
                />

              </Form>
            </Main>
          </div>

        </Provider>
      </div>
    );
  }

  constructor (props) {
    super(props)
  }
}
