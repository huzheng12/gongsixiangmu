import React, { Component } from 'react';
import {IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import zh_CN from './Language/zh_CN';
import en_US from './Language/en_US.js';
// import zh from 'react-intl/locale-data/zh';
// import en from 'react-intl/locale-data/en';

// addLocaleData([...zh,...en]);

@connect(
    state => {
        return {
            language: state.data.language,
            localeMessage: chooseLocale(state.data.language)
        }
    }
)
class Intl extends Component {
  render() {
    let { language, localeMessage, children } = this.props;
    return (
      <IntlProvider key={language} locale={language} messages={localeMessage}>
        {children}
      </IntlProvider>
    )
  }
};

function chooseLocale(val) {
  let _val = val || localStorage.getItem('language');
  switch (_val) {
    case 'en':
      return en_US;
    case 'zh':
      return zh_CN;
    default:
      return zh_CN;
  }
}


export default Intl;