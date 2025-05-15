import * as React from 'react';
import { Chip } from '@heroui/react';

import { getStatusColor } from '../../servises/get-status-color.ts';
import { Status } from '../../types.ts';

type StatusChipProps = {
    className?: string;
    status?: Status;
    children?: React.ReactNode;
};

export const StatusChip = ({ status, children }: StatusChipProps) => {
    const color = status ? getStatusColor(status) : 'warning';
    return (
        <Chip className={ `text-foreground border-${ color }-200` } color={ color } variant='dot' size='sm' radius='sm'>
            { children }
        </Chip>
    );
};