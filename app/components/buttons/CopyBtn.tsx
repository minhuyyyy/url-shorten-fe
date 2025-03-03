import { useI18n } from '@/app/contexts/I18nContext';
import { Button } from '@heroui/button';
import React from 'react';

function CopyBtn({
    onPress,
    value,
}: {
    onPress: (text: string) => void;
    value: string;
}) {
    const { t } = useI18n();
    return (
        <Button
            color='primary'
            onPress={() => onPress(value)}
        >
            {t('copyBtn')}
        </Button>
    );
}

export default CopyBtn;
