import { addLocaleData } from 'react-intl';
import { enMessages, frMessages } from '../../i18n';
import frLocaleData from 'react-intl/locale-data/fr';

// I18n config. By default, as long as we don't have the user's preferences, check the browser lang and stick to it
addLocaleData(frLocaleData);
let language = navigator.language || navigator.userLanguage || navigator.languages[0];
if (language === undefined || language === null) language = "en_EN";
let languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

languageWithoutRegionCode = "fr";
// languageWithoutRegionCode = "en";

export default function i18n(state = {
  lang: languageWithoutRegionCode,
  messages: findTradFor(languageWithoutRegionCode),
}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function findTradFor(lang) {
  switch (lang) {
    case 'fr': return Object.assign(frMessages);
    case 'en': return Object.assign(enMessages);
    default: return enMessages;
  }
};