import React from 'react';
import { Control, useController } from 'react-hook-form';
import { Input as HeroInput } from '@heroui/input';


type InputProps = {
    name: string;
    label: string;
    placeholder?: string;
    type?: 'text' | 'tel';
    control: Control<any>;
    required?: string;
    className?: string;
}

export const Input: React.FC<InputProps> = ({ name, label, placeholder, type, control, required = '', className }) => {
    const { field, fieldState: { invalid }, formState: { errors } } = useController({
        name,
        control,
        rules: { required }
    });
    
    return (
        <HeroInput
            classNames={ { inputWrapper: 'pl-0 border-0 border-b-1' } }
            className={ className }
            id={ name }
            label={ label }
            type={ type }
            variant={ 'bordered' }
            placeholder={ placeholder }
            value={ !field.value?.trim() ? '' : field.value }
            radius={ 'none' }
            name={ field.name }
            isInvalid={ invalid }
            onChange={ field.onChange }
            onBlur={ field.onBlur }
            errorMessage={ `${ errors.name?.message ?? '' }` }
        />
    );
};