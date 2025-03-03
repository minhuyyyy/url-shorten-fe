import { JSX } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type InputProps = {
    label: string;
    register: UseFormRegisterReturn
    name: string;
    className?: string;
    error?: string;
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showEndContent?: boolean;
    endContent?: JSX.Element;
    disabled?: boolean;
}