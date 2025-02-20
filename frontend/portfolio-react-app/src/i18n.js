import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationFR from './locales/fr/translation.json';
import translationEN from './locales/en/translation.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            fr: {translation: translationFR},
            en: {translation: translationEN}
        },
        fallbackLng: 'fr',
        detection: {
            order: ['path'],
            lookupFromPathIndex: 0,
            checkWhitelist: true,
        },
        whitelist: ['fr', 'en'],
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;