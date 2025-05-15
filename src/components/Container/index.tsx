import React, { ReactElement } from 'react';

type ContainerProps = {
    children: ReactElement | ReactElement[];
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className='max-w-screen-lg mx-auto px-6' style={ { minHeight: 'calc(100vh - 84px)' } }>
            { children }
        </div>
    );
};