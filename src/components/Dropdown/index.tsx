import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Button, cn, Dropdown as HeroDropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@heroui/react';

import { AddNoteIcon, DeleteDocumentIcon, EditDocumentIcon, MenuIcon } from '../../share/icons';
import { PATHS } from '../../constants/paths.ts';
import { useTheme } from '../../hooks';


type DropdownProps = {
    vacancyId: string
    onOpen: () => void,
    onModalOpen: () => void
};

export function Dropdown({ onOpen, onModalOpen }: DropdownProps): React.JSX.Element {
    const iconClasses = useMemo(() => 'text-xl text-default-500 pointer-events-none flex-shrink-0', []);
    
    const { theme } = useTheme();
    const navigate = useNavigate();
    
    return (
        <HeroDropdown className={ `${ theme } text-foreground` }>
            <DropdownTrigger>
                <Button className={ 'ml-auto p-0 min-w-7 h-7' } radius={ 'full' } variant='light'>
                    <MenuIcon className='w-full h-5' />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label='Dropdown menu with description' variant='faded'>
                <DropdownSection showDivider title='Actions'>
                    <DropdownItem
                        key='new'
                        description='Create a new file'
                        startContent={ <AddNoteIcon className={ iconClasses } /> }
                        onPress={ () => navigate(PATHS.vacancyAdd) }
                    >
                        New file
                    </DropdownItem>
                    <DropdownItem
                        key='edit'
                        description='Allows you to edit the file'
                        startContent={ <EditDocumentIcon className={ iconClasses } /> }
                        onPress={ () => onOpen() }
                    >
                        Edit file
                    </DropdownItem>
                </DropdownSection>
                <DropdownSection title='Danger zone'>
                    <DropdownItem
                        key='delete'
                        className='text-danger'
                        color='danger'
                        description='Permanently delete the file'
                        startContent={ <DeleteDocumentIcon className={ cn(iconClasses, 'text-danger') } /> }
                        onPress={ onModalOpen }
                    >
                        Delete file
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </HeroDropdown>
    );
}