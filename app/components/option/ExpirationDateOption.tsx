import { useI18n } from '@/app/contexts/I18nContext';
import { Button, ButtonGroup } from '@heroui/button';
import { DatePicker } from '@heroui/date-picker';
import { Radio, RadioGroup, RadioProps } from '@heroui/radio';
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
import { Switch } from '@heroui/switch';
import { OptionsProps } from '@/app/contracts/types/FormDataRef';

function ExpirationDateOption({
    expirationDate,
    setExpirationDate,
}: Partial<OptionsProps>) {
    const { t } = useI18n();
    const { locale } = useLocale();

    const now = today(getLocalTimeZone());
    const nextWeek = startOfWeek(now.add({ weeks: 1 }), locale);
    const nextMonth = startOfMonth(now.add({ months: 1 }));

    const [selectingExpirationDate, setSelectingExpirationDate] =
        useState<boolean>(false);
    const [internalDate, setInternalDate] = useState<typeof now | null>(null);

    // Watch for expiration date changes
    useEffect(() => {
        if (!internalDate) {
            setExpirationDate?.(null); // If no date is selected
            return;
        }

        const nativeDate = internalDate.toDate(getLocalTimeZone());
        const year = nativeDate.getFullYear();
        const month = String(nativeDate.getMonth() + 1).padStart(2, '0');
        const day = String(nativeDate.getDate()).padStart(2, '0');

        const formatted = `${year}-${month}-${day}`;
        setExpirationDate?.(formatted);
    }, [internalDate, setExpirationDate, expirationDate]);

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
        <>
            <Switch
                isSelected={selectingExpirationDate}
                onValueChange={setSelectingExpirationDate}
                classNames={{
                    base: cn(
                        'inline-flex flex-row-reverse w-full max-w-screen bg-white items-start',
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
                <p className='text-medium'>{t('setUrlExpirationDate')}</p>
            </Switch>
            <div className='flex flex-col gap-1 mx-6'>
                {selectingExpirationDate && (
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
                                <CustomRadio value='1_day'>1 day</CustomRadio>
                                <CustomRadio value='2_days'>2 days</CustomRadio>
                                <CustomRadio value='3_days'>3 days</CustomRadio>
                                <CustomRadio value='7_days'>7 days</CustomRadio>
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
                                <Button onPress={() => setInternalDate(now)}>
                                    Today
                                </Button>
                                <Button
                                    onPress={() => setInternalDate(nextWeek)}
                                >
                                    Next week
                                </Button>
                                <Button
                                    onPress={() => setInternalDate(nextMonth)}
                                >
                                    Next month
                                </Button>
                            </ButtonGroup>
                        }
                        calendarProps={{
                            focusedValue: internalDate,
                            onFocusChange: setInternalDate,
                            nextButtonProps: {
                                variant: 'bordered',
                            },
                            prevButtonProps: {
                                variant: 'bordered',
                            },
                        }}
                        label={t('setUrlExpirationDate')}
                        value={internalDate}
                        onChange={(e) => e && setInternalDate(e)}
                    />
                )}
            </div>
        </>
    );
}

export default ExpirationDateOption;
