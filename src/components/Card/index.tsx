import React from 'react';
import { useDisclosure } from '@heroui/react';
import { Card as HeroCard, CardHeader, CardBody, CardFooter } from '@heroui/card';

import { VacancyContacts, VacancySalary, VacancyTags, VacancyTitle } from '../VacancyCardInfo';
import { DeleteConfirmation } from '../DeleteConfirmation';
import { EditVacancy } from '../EditVacancy';
import { Dropdown } from '../Dropdown';
import { Vacancy } from '../../types.ts';


type CardProps = {
    vacancy: Vacancy,
    className?: string,
}

export const Card: React.FC<CardProps> = ({ vacancy, className }) => {
    const {
        id,
        isActive,
        status,
        name,
        platform,
        salary,
        salaryFrom,
        salaryTo,
        companyName,
        contactPerson,
        contactPhone,
        date
    } = vacancy;
    
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    
    
    return (
        <HeroCard className={ className }>
            <CardHeader className='flex flex-col items-start'>
                <VacancyTags isActive={ isActive } status={ status } />
                <div className='w-full flex gap-3'>
                    <VacancyTitle
                        className={ 'cursor-pointer' }
                        name={ name }
                        platform={ platform }
                        onClick={ () => onOpen() }
                    />
                    <Dropdown vacancyId={ id } onOpen={ onOpen } onModalOpen={ onModalOpen } />
                </div>
                <VacancySalary salary={ salary } salaryFrom={ salaryFrom } salaryTo={ salaryTo } />
            </CardHeader>
            <CardBody className='flex-col items-start'>
                <p className='text-indigo-500 italic'>{ companyName }</p>
            </CardBody>
            <CardFooter className='flex flex-wrap justify-between gap-5'>
                <VacancyContacts contactPerson={ contactPerson } contactPhone={ contactPhone } />
                <p className='text-gray-400'>{ date.toLocaleDateString() }</p>
            </CardFooter>
            <EditVacancy vacancy={ vacancy } isOpen={ isOpen } onClose={ onClose } onModalOpen={ onModalOpen } />
            <DeleteConfirmation isOpen={ isModalOpen } onClose={ onModalClose } vacancyId={ vacancy.id } />
        </HeroCard>
    );
};