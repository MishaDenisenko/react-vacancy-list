import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CloseCircleOutlined, SearchOutlined } from '@ant-design/icons';


type InputProps = {
    placeholder?: string;
    type?: 'text' | 'email' | 'url' | 'password' | 'tel' | 'search' | 'file';
    className?: string;
}

export const Input: React.FC<InputProps> = ({ type = 'text', className, placeholder }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState('');
    const inputRef = useRef(null);
    const wrapperRef = useRef(null);
    
    const handleSetOpen = useCallback(() => {
        setOpen(!inputRef.current || inputRef.current?.value.trim().length > 0);
    }, []);
    
    const handleClickOutside = useCallback((event: MouseEvent) => {
        !wrapperRef.current?.contains(event.target as Node) && setOpen(inputRef.current?.value.trim().length > 0);
    }, []);
    
    useEffect(() => {
        open && inputRef.current?.focus();
    }, [open]);
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    return (
        <div ref={ wrapperRef } className='relative flex items-center space-x-2'>
            <AnimatePresence>
                { open && (
                    <>
                        <motion.input
                            ref={ inputRef }
                            type={ type }
                            value={ value }
                            onChange={ (e) => setValue(e.target.value) }
                            placeholder={ placeholder || 'Search...' }
                            initial={ { width: 0, opacity: 0 } }
                            animate={ { width: '20rem', opacity: 1 } }
                            exit={ { width: 0, opacity: 0 } }
                            transition={ { duration: 0.3, ease: 'easeInOut' } }
                            className={ className }
                        />
                        { value &&
                            <CloseCircleOutlined
                                onClick={ () => setValue('') }
                                className='absolute  right-11 top-1/2 -translate-y-1/2 text-secondary'
                            />
                        }
                    </>
                ) }
            </AnimatePresence>
            <SearchOutlined onClick={ handleSetOpen } style={ { fontSize: '1.5rem' } } />
        </div>
    );
};