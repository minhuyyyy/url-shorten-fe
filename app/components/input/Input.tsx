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
                classNames={{
                    inputWrapper: [
                        'bg-white',
                        'data-[hover=true]:bg-white', // Override hover background
                        'data-[focus=true]:bg-white', // Override focus background
                        'data-[focus-visible=true]:bg-white', // Override keyboard focus background
                        'data-[focus-within=true]:bg-white', // Override focus-within background
                        'data-[hover=true]:border-current', // Keep border the same on hover
                        'data-[focus=true]:border-current', // Keep border the same on focus
                        'data-[focus-visible=true]:border-current', // Keep border the same on keyboard focus
                        'data-[focus-within=true]:border-current',
                    ],
                }}
                type={props.type}
            />
        </div>
    );
}

export default InputComponent;
