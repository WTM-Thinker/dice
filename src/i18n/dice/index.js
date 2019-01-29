import en from './en';

export default function() {
    let appLocale = window.selfDefinedI18n ? window.selfDefinedI18n : '';
    if (appLocale) {
        appLocale = appLocale.indexOf('zh') === 0 ? 'zh' : 'en';
    }
    let locale = appLocale || 'en';

    return {
        locale,
        fallbackLocale: 'en',
        messages: {
            en
        }
    };
}