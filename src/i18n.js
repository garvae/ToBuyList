import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';

import { get as getLs } from 'local-storage';

import LanguageDetector from 'i18next-browser-languagedetector';

import en from './i18n/locales/en/translation.json';
import ru from './i18n/locales/ru/translation.json';

const resources = {
    en: {
        translation: en,
    },
    ru: {
        translation: ru,
    },
};

const userLang = getLs('i18nextLng');

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: userLang || 'ru',
        debug: false,
        detection: {
            order: ['cookie'],
            cache: ['cookie'],
        },
    });

export default i18n;
