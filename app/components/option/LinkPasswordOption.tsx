import { useI18n } from '@/app/contexts/I18nContext';
import { Switch } from '@heroui/switch';
import { cn } from '@heroui/theme';
import React, { useEffect, useState } from 'react';
import InputComponent from '@components/input/Input';
import { Button } from '@heroui/button';
import { OptionsProps } from '@/app/contracts/types/FormDataRef';

function LinkPasswordOption({
    urlPassword,
    setUrlPassword,
}: Pick<OptionsProps, 'urlPassword' | 'setUrlPassword'>) {
    const [settingLinkPassword, isSettingLinkPassword] =
        useState<boolean>(false);
    const [linkPassword, setLinkPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { t } = useI18n();

    useEffect(() => {
        if (linkPassword) {
            setUrlPassword(linkPassword);
        } else {
            setUrlPassword(null);
        }   
        console.log('🚀 ~ urlPassword:', urlPassword);
    }, [urlPassword, linkPassword]);

    return (
        <div className='w-full'>
            <Switch
                isSelected={settingLinkPassword}
                onValueChange={(e) => {
                    isSettingLinkPassword(e);
                    setLinkPassword('');
                }}
                classNames={{
                    base: cn(
                        'inline-flex flex-row-reverse w-full max-w-screen bg-white items-start  ',
                        'justify-between cursor-pointer rounded-lg p-4 border-2 border-transparent',
                    ),
                    wrapper: 'p-0 h-4 overflow-visible',
                    thumb: cn(
                        'w-6 h-6 border-2 shadow-lg',
                        'group-data-[selected=true]:ms-6',
                        // pressed
                        'group-data-[pressed=true]:w-7',
                        'group-data-[selected]:group-data-[pressed]:ms-4',
                    ),
                }}
            >
                <p className='text-medium'>{t('setUrlPassword')}</p>
            </Switch>
            {settingLinkPassword && (
                <div className='flex flex-col sm:flex-row gap-2 items-start sm:items-center w-full px-6 pb-4'>
                    <div className='flex-1 w-full'>
                        <InputComponent
                            label={t('setUrlPassword')}
                            name='url_password'
                            value={linkPassword}
                            onChange={(e) => setLinkPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            showEndContent={false}
                        />
                    </div>

                    <Button
                        onPress={() => setShowPassword(!showPassword)}
                        className='w-full sm:w-auto min-w-fit truncate px-3 py-1 text-sm'
                    >
                        {showPassword
                            ? t('hideUrlPassword')
                            : t('showUrlPassword')}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default LinkPasswordOption;
