import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@styles/main.scss';
import { dir } from 'i18next';
import NavBar from '@components/navigation/Navbar';
import { languages } from '@i18n/settings';
import { I18nProvider } from '@contexts/I18nContext';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Shortify - Link Shorten Website',
    description:
        'Shorten, manage, and share your links effortlessly with our fast and reliable URL shortener. Track clicks, customize your links, and simplify your online experience.',
};

export async function generateStaticParams() {
    return languages.map((lang) => ({ lang }));
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;

    return (
        <html
            lang={lang}
            dir={dir(lang)}
        >
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <I18nProvider
                    lang={lang}
                    namespace='translation'
                >
                    <div className='grid grid-rows-[20px_1fr_20px] items-center min-h-screen pb-20'>
                        <NavBar />
                        <main className='flex flex-col sm:flex-row items-center justify-evenly w-full pt-20'>
                            {children}
                        </main>
                    </div>
                </I18nProvider>
            </body>
        </html>
    );
}
