import React from 'react';
import { Input } from '@heroui/input';
import { InputProps } from '@/app/contracts/types/InputProps';

function InputComponent(props: InputProps) {
    return (
        <div className={props.className}>
            <Input
                label={props.label}
                labelPlacement='inside'
                {...props.register}
                errorMessage={props.error}
                isInvalid={!!props.error}
                value={props.value}
                onChange={props.onChange}
                endContent={props.showEndContent && props.endContent}
            />
        </div>
    );
}

export default InputComponent;
