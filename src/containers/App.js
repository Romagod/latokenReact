import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux';
import {Provider} from 'react-redux';

import { validatorLength,
  validatorFalse,
  validatorRequired,
  validatorTest} from "../other/validators"

import * as reducers from '../reducers';
import * as additionalInfo from '../other/additionalInfo'

import MainNavApp from "./MainNavApp"
import InputWrapper from "./InputApp"
import InputText from "../components/InputText"
import Form from "../components/Form"
import Dropdown from "../components/Dropdown"
import FileLoader from "../components/FileLoader"

const reducer = combineReducers(reducers);
export const store = createStore(reducer);

export default class App extends Component {
  render() {
    // let Test = InputWrapper(InputText, 'projectform')
    // let TestDrop = InputWrapper(Dropdown, 'projectform')
    // let TestLoader = InputWrapper(FileLoader, 'projectform')
    // let Test2 = InputWrapper(InputText, 'project-form-2')

    return (
      <div>
        <Provider store={store}>
          <MainNavApp />
        </Provider>
      </div>
    );
  }

  constructor (props) {
    super(props)

    setTimeout(() => {
      console.log(store.getState())
    }, 5000)
  }
}


{/*<Form*/}
{/*  base={{*/}
{/*    action: '/',*/}
{/*    name: 'projectform'*/}
{/*  }}>*/}

{/*  <TestLoader*/}
{/*    base={{*/}
{/*      name: 'fileloader',*/}
{/*      multiple: true,*/}
{/*      validTypes: ['application/pdf', 'image/png', 'image/jpg'],*/}
{/*      max: 3,*/}
{/*      maxFileSize: 52428800*/}
{/*    }}*/}
{/*    options={{*/}
{/*      highlightingOnSuccess: false,*/}
{/*      placeholder: 'base placeholder'*/}
{/*    }}*/}
{/*    info={additionalInfo.infoFileNames('Lo-lo')}*/}
{/*  />*/}

{/*  <TestDrop base={{*/}
{/*    name: 'dropdown',*/}
{/*    id: 'dropdown',*/}
{/*    max: 2,*/}
{/*    source: '/droplistdata'*/}
{/*  }}*/}
{/*            validators={{*/}
{/*              submit: [validatorRequired({})]*/}
{/*            }}*/}
{/*            info={additionalInfo.maxItems('Max max max')}*/}
{/*  />*/}

{/*  <Test*/}
{/*    base={{*/}
{/*      name: 'input-1',*/}
{/*      id: 'input-1',*/}
{/*      placeholder: 'placeholder',*/}
{/*      max: 5*/}
{/*    }}*/}
{/*    validators={{*/}
{/*      input: [validatorLength({})],*/}
{/*      submit: [validatorFalse({})]*/}
{/*    }}*/}
{/*    info={additionalInfo.infoSymbolsCount('Test')}*/}
{/*  />*/}

{/*  <Test*/}
{/*    base={{*/}
{/*      name: 'input-2',*/}
{/*      id: 'input-2',*/}
{/*      placeholder: 'placeholder',*/}
{/*      max: 2*/}
{/*    }}*/}
{/*    validators={{*/}
{/*      // input: [validatorLength({})],*/}
{/*      change: [validatorLength({})],*/}
{/*      submit: [validatorFalse({})]*/}
{/*    }}*/}
{/*    info={additionalInfo.infoSymbolsCount('Test-2')}*/}
{/*  />*/}

{/*</Form>*/}
