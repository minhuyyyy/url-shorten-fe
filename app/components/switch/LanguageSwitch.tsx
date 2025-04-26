'use client';

import { useI18n } from '@/app/contexts/I18nContext';
import { Switch } from '@heroui/switch';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LanguageSwitch() {
    const [isEnglish, setIsEnglish] = useState(true);
    const pathname = usePathname();
    const router = useRouter();
    const { t } = useI18n();
    const handleChange = (selected: boolean) => {
        if (selected) {
            router.push('/en');
        } else {
            router.push('/vi');
        }
    };

    useEffect(() => {
        setIsEnglish(pathname.startsWith('/en'));
    }, [pathname]);

    return (
        <div className='flex items-center gap-2'>
            <span className='text-sm'>{t('switchLanguage')}</span>
            <Switch
                size='lg'
                color='primary'
                isSelected={isEnglish}
                onValueChange={handleChange}
                aria-label='Language Switch'
                startContent={<p className='text-xs'>EN</p>}
                endContent={<p className='text-xs'>VI</p>}
            />
        </div>
    );
}
