import * as React from 'react';
import { Control, useController } from 'react-hook-form';
import { Select as HeroSelect, SelectItem } from '@heroui/react';

import { StatusChip } from '../StatusChip';
import { Status, statuses } from '../../types.ts';
import { useTheme } from '../../hooks';


type SelectProps = {
    name: string;
    label: string;
    defaultValue: Status;
    control: Control<any>;
    className?: string;
};

export const Select = ({ className, name, control, defaultValue, label }: SelectProps) => {
    const { theme } = useTheme();
    
    const { field } = useController({
        name,
        control
    });
    
    return (
        <HeroSelect
            id={ name }
            classNames={ {
                popoverContent: `${ theme } text-foreground bg-background`
            } }
            className={ `${ className } ${ theme }` }
            defaultSelectedKeys={ [defaultValue] }
            label={ label }
            labelPlacement={ 'outside-left' }
            onChange={ field.onChange }
            disallowEmptySelection
        >
            { statuses.map(s => (
                <SelectItem key={ s } textValue={ s }>
                    <StatusChip status={ s }>
                        { s }
                    </StatusChip>
                </SelectItem>
            )) }
        </HeroSelect>
    );
};