import React from 'react';
import { Platform } from '../../types.ts';

type Props = {
    platform: Platform;
}

export const PlatformImage: React.FC<Props> = ({ platform }) => {
    return platform === 'work' ? (
        <img className='h-5 my-auto' src='/rabota.png' alt='work' />
    ) : platform === 'robota' ? (
        <img className='h-5 my-auto' src='/rabota.png' alt='work' />
    ) : null;
};