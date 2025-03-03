import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { getOptions } from './settings';

const initI18next = async (lang: string, ns: string) => {
    await i18next
        .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
        .init(getOptions(lang, ns));
};

export async function getTranslation(lang: string, ns: string) {
    await initI18next(lang, ns);
    return {
        t: (key: string) => i18next.t(key),
    };
}
