'use client';
import { Button } from '@heroui/button';
import { permanentRedirect, RedirectType, usePathname } from 'next/navigation';
import React from 'react';

function TestRedirectBtn() {
    const pathname = usePathname();
    return (
        <Button
            onPress={() =>
                permanentRedirect(`${pathname}/hehe`, RedirectType.replace)
            }
        >
            Test permanent redirect to hehe
        </Button>
    );
}

export default TestRedirectBtn;
