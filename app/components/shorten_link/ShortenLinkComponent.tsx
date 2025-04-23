'use client';

import React, { useState } from 'react';
import InputComponent from '@components/input/Input';
import { Button } from '@heroui/button';
import { FieldValues, useForm } from 'react-hook-form';
import CopyBtn from '@components/buttons/CopyBtn';
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/popover';
import { useI18n } from '@/app/contexts/I18nContext';
import { ErrorEnum } from '@/app/contracts/enums/Error';
import LinkShortenOption from '@components/option/LinkShortenOption';
import postShortenLink from '@/app/api/postShortenLink';

function ShortenLinkComponent() {
    const { t } = useI18n();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm();

    const [openPopover, setOpenPopover] = useState(false);
    const [showCopyBtn, setShowCopyBtn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isInputDisabled, setIsInputDisabled] = useState(false);
    const [expirationDate, setExpirationDate] = useState<string | null>(null);
    const [parentUrlPassword, setParentUrlPassword] = useState<string | null>(
        null,
    );
    const onSubmit = async (data: FieldValues) => {
        const formData = new FormData();
        formData.append('originalUrl', data.originalUrl);
        formData.append('shortCode', data.shortCode);

        if (expirationDate) {
            formData.append('expirationDate', expirationDate);
        }
        if (parentUrlPassword) {
            formData.append('password', parentUrlPassword);
        }

        try {
            const res = await postShortenLink(formData);
            if (res?.shortenedURL) {
                setValue(
                    'originalUrl',
                    `http://localhost:8080/api/urls/${res.shortenedURL}`,
                    { shouldValidate: true },
                );
                setShowCopyBtn(true);
                setIsInputDisabled(true);
            }
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === ErrorEnum[ErrorEnum.SHORTENED_URL_EXISTED]
            ) {
                setError(t('shortCodeExistedError'));
            }
        }
    };

    const onPressCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => setOpenPopover(true));
    };

    const urlRegex =
        /^((http|https):\/\/)(localhost|(\d{1,3}\.){3}\d{1,3}|([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})(:\d{1,5})?(\/[^\s]*)?(#[^\s]*)?$/;

    return (
        <div className='w-full'>
            <h1 className='text-2xl font-bold text-center'>{t('heading')}</h1>

            {error && (
                <div className='bg-red-500 text-white rounded-md'>
                    <p className='font-semibold text-lg text-center'>{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputComponent
                    className='my-6'
                    label={t('originalUrlInput')}
                    name='originalUrl'
                    register={register('originalUrl', {
                        required: t('originalUrlRequired'),
                        pattern: {
                            value: urlRegex,
                            message: t('invalidUrl'),
                        },
                    })}
                    error={errors.originalUrl?.message as string}
                    value={watch('originalUrl')}
                    onChange={(e) => {
                        setValue('originalUrl', e.target.value, {
                            shouldValidate: true,
                        });
                        setShowCopyBtn(false);
                        setIsInputDisabled(false);
                    }}
                    disabled={isInputDisabled}
                    showEndContent={showCopyBtn}
                    endContent={
                        <Popover
                            placement='right'
                            isOpen={openPopover}
                            onOpenChange={(open) => setOpenPopover(open)}
                        >
                            <PopoverTrigger>
                                <div className='relative'>
                                    <CopyBtn
                                        onPress={onPressCopy}
                                        value={watch('originalUrl')}
                                    />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent>
                                <p>{t('urlCopied')}</p>
                            </PopoverContent>
                        </Popover>
                    }
                />
                <InputComponent
                    label={t('shortCodeInput')}
                    className='my-6'
                    name='shortCode'
                    register={register('shortCode', {
                        required: t('shortCodeRequired'),
                    })}
                    error={errors.shortCode?.message as string}
                    value={watch('shortCode')}
                    onChange={(e) => {
                        setValue('shortCode', e.target.value, {
                            shouldValidate: true,
                        });
                        setIsInputDisabled(false);
                    }}
                    disabled={isInputDisabled}
                />
                <LinkShortenOption
                    expirationDate={expirationDate}
                    setExpirationDate={setExpirationDate}
                    urlPassword={parentUrlPassword}
                    setUrlPassword={setParentUrlPassword}
                />
                <Button
                    type='submit'
                    className='mt-6'
                >
                    {t('shortenBtn')}
                </Button>
            </form>
        </div>
    );
}

export default ShortenLinkComponent;
