'use client';

import Loading from '@components/loading/Loading';
import { getTranslation } from '../i18n';
import { createContext, useContext, useEffect, useState } from 'react';
type I18nContextType = {
    t: (key: string) => string;
    lang: string;
    ns?: string;
};
export const I18nContext = createContext<I18nContextType | undefined>(
    undefined,
);

export function I18nProvider({
    children,
    lang,
    namespace = 'translation',
}: {
    children: React.ReactNode;
    lang: string;
    namespace: string;
}) {
    const [t, setT] = useState<(key: string) => string>(
        () => (key: string) => key,
    );
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadTranslation(lang: string, ns: string) {
            const { t } = await getTranslation(lang, ns);
            setT(() => t);
            setLoading(false);
        }
        loadTranslation(lang, namespace);
    }, [lang, namespace]);
    if (loading) {
        return <Loading />;
    }
    return (
        <I18nContext.Provider value={{ t, lang, ns: namespace }}>
            {children}
        </I18nContext.Provider>
    );
}
export function useI18n() {
    const context: I18nContextType | undefined = useContext(I18nContext);
    if (!context)
        throw new Error('useI18n must be used within an I18nProvider');
    return context;
}
