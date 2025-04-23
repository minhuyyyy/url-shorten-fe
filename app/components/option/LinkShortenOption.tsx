'use client';

import { OptionsProps } from '@/app/contracts/types/FormDataRef';
import { HeroUIProvider } from '@heroui/system';
import React from 'react';
import '@styles/components/option.scss';
import ExpirationDateOption from './ExpirationDateOption';
import { useI18n } from '@/app/contexts/I18nContext';
import LinkPasswordOption from './LinkPasswordOption';

function LinkShortenOption(props: Partial<OptionsProps>) {
    const { t } = useI18n();
    return (
        <div className='flex flex-row gap-4 w-full'>
            <details className='cursor-pointer details'>
                <summary>
                    <span className='summary-title'>
                        {t('shortenLinkOptions')}
                    </span>
                </summary>
                <div className='summary-content'>
                    <HeroUIProvider locale='pt-BR'>
                        <ExpirationDateOption
                            setExpirationDate={
                                props.setExpirationDate ?? (() => {})
                            }
                            expirationDate={props.expirationDate ?? null}
                        />
                        <LinkPasswordOption
                            urlPassword={props.urlPassword ?? null}
                            setUrlPassword={props.setUrlPassword ?? (() => {})}
                        />
                    </HeroUIProvider>
                </div>
            </details>
        </div>
    );
}

export default LinkShortenOption;
