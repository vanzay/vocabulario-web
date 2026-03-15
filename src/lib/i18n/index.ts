import {page} from "$app/state";
import {PUBLIC_FALLBACK_LOCALE} from "$env/static/public";
import translations from "./translations";

export const locales = Object.keys(translations);

function translate(key: string, vars?: Record<string, string>, locale?: string): string {
    if (!key) {
        throw new Error("no key provided to t()");
    }

    if (!locale || !locales.includes(locale)) {
        locale = PUBLIC_FALLBACK_LOCALE;
    }

    let text = translations[locale][key];
    if (!text) {
        return key;
    }

    if (vars) {
        Object.keys(vars).map((k) => {
            const regex = new RegExp(`{{${k}}}`, "g");
            text = text.replace(regex, vars[k]);
        });
    }

    return text;
}

export const getTranslator = (locale?: string) => {
    return (key: string, vars?: Record<string, string>): string => translate(key, vars, locale);
}

export const t = (key: string, vars?: Record<string, string>) => translate(key, vars, page.data.locale);

export const extractLanguage = (language: string): string => {
    const dashIndex = language.indexOf("-")
    return dashIndex > 0 ? language.substring(0, dashIndex) : language;
}
