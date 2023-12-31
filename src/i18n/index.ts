import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import English from '../i18n/locale/en';
import Melayu from '../i18n/locale/ms';
import Mandarin from '../i18n/locale/zh';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: English,
    ms: Melayu,
    zh: Mandarin,
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  supportedLngs: ['en', 'ms', 'zh'],
});

export default i18n;
