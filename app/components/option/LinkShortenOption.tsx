'use client';

import { useI18n } from '@/app/contexts/I18nContext';
import { Props } from '@/app/contracts/types/FormDataRef';
import { Button, ButtonGroup } from '@heroui/button';
import { DatePicker } from '@heroui/date-picker';
import { Radio, RadioGroup, RadioProps } from '@heroui/radio';
import { HeroUIProvider } from '@heroui/system';
import { cn } from '@heroui/theme';
import {
    getLocalTimeZone,
    startOfMonth,
    startOfWeek,
    today,
} from '@internationalized/date';
import { useLocale } from '@react-aria/i18n';
import React, { useState, useEffect } from 'react';
import '@styles/components/option.scss';

function LinkShortenOption({ setExpirationDate }: Props) {
    const defaultDate = today(getLocalTimeZone());
    const { t } = useI18n();
    const [internalDate, setInternalDate] = useState(defaultDate);
    const { locale } = useLocale();

    const now = today(getLocalTimeZone());
    const nextWeek = startOfWeek(now.add({ weeks: 1 }), locale);
    const nextMonth = startOfMonth(now.add({ months: 1 }));

    useEffect(() => {
        const nativeDate = internalDate.toDate(getLocalTimeZone());
        const year = nativeDate.getFullYear();
        const month = String(nativeDate.getMonth() + 1).padStart(2, '0');
        const day = String(nativeDate.getDate()).padStart(2, '0');

        const formatted = `${year}-${month}-${day}`;
        setExpirationDate(formatted);

        console.log('✅ Local formatted date:', formatted);
    }, [internalDate]);

    const CustomRadio = (props: RadioProps) => {
        const { children, ...otherProps } = props;

        return (
            <Radio
                {...otherProps}
                classNames={{
                    base: cn(
                        'flex-none m-0 h-8 bg-content1 hover:bg-content2 items-center justify-between',
                        'cursor-pointer rounded-full border-2 border-default-200/60',
                        'data-[selected=true]:border-primary',
                    ),
                    label: 'text-tiny text-default-500',
                    labelWrapper: 'px-1 m-0',
                    wrapper: 'hidden',
                }}
            >
                {children}
            </Radio>
        );
    };

    return (
        <div className='flex flex-row gap-4 w-full'>
            <details className='cursor-pointer details'>
                <summary>
                    <span className='summary-title'>Shorten link option</span>
                    <div className='summary-chevron-up'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            className='feather feather-chevron-down'
                        >
                            <polyline points='6 9 12 15 18 9'></polyline>
                        </svg>
                    </div>
                </summary>
                <div className='summary-content'>
                    <HeroUIProvider locale='pt-BR'>
                        <DatePicker
                            CalendarBottomContent={
                                <RadioGroup
                                    aria-label='Date precision'
                                    classNames={{
                                        base: 'w-full pb-2',
                                        wrapper:
                                            '-my-2.5 py-2.5 px-3 gap-1 flex-nowrap max-w-[380px] overflow-x-scroll',
                                    }}
                                    defaultValue='exact_dates'
                                    orientation='horizontal'
                                >
                                    <CustomRadio value='exact_dates'>
                                        Exact dates
                                    </CustomRadio>
                                    <CustomRadio value='1_day'>
                                        1 day
                                    </CustomRadio>
                                    <CustomRadio value='2_days'>
                                        2 days
                                    </CustomRadio>
                                    <CustomRadio value='3_days'>
                                        3 days
                                    </CustomRadio>
                                    <CustomRadio value='7_days'>
                                        7 days
                                    </CustomRadio>
                                    <CustomRadio value='14_days'>
                                        14 days
                                    </CustomRadio>
                                </RadioGroup>
                            }
                            CalendarTopContent={
                                <ButtonGroup
                                    fullWidth
                                    className='px-3 pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60'
                                    radius='full'
                                    size='sm'
                                    variant='bordered'
                                >
                                    <Button
                                        onPress={() => setInternalDate(now)}
                                    >
                                        Today
                                    </Button>
                                    <Button
                                        onPress={() =>
                                            setInternalDate(nextWeek)
                                        }
                                    >
                                        Next week
                                    </Button>
                                    <Button
                                        onPress={() =>
                                            setInternalDate(nextMonth)
                                        }
                                    >
                                        Next month
                                    </Button>
                                </ButtonGroup>
                            }
                            calendarProps={{
                                focusedValue: internalDate,
                                onFocusChange: setInternalDate,
                                nextButtonProps: { variant: 'bordered' },
                                prevButtonProps: { variant: 'bordered' },
                            }}
                            label={t('setUrlExpirationDate')}
                            value={internalDate}
                            onChange={(e) => e && setInternalDate(e)}
                        />
                    </HeroUIProvider>
                </div>
                <div className='summary-chevron-down'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-chevron-up'
                    >
                        <polyline points='18 15 12 9 6 15'></polyline>
                    </svg>
                </div>
            </details>
        </div>
    );
}

export default LinkShortenOption;
