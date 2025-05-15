import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, Modal, ModalBody, ModalContent, ModalHeader, Link } from '@heroui/react';

import { DeleteDocumentIcon, EditDocumentIcon } from '../../share/icons';
import { VacancySalary, VacancyTags } from '../VacancyCardInfo';
import { Select } from '../Select';
import { Input } from '../Input';
import { useVacanciesStore } from '../../stores/useVacanciesStore.ts';
import { Status, Vacancy } from '../../types.ts';
import { useTheme } from '../../hooks';

type EditVacancyProps = {
    vacancy: Vacancy,
    isOpen: boolean,
    onClose: () => void,
    onModalOpen: () => void,
    className?: string;
};

type VacancyData = {
    name?: string,
    status?: Status,
    contactPerson?: string,
    contactPhone?: string
}

export const EditVacancy = ({ vacancy, isOpen, onClose, onModalOpen }: EditVacancyProps) => {
    const [removeContacts, setRemoveContacts] = useState<boolean>(false);
    const [isEdited, setIsEdited] = useState<boolean>(false);
    const { fetchVacancies, updateVacancy } = useVacanciesStore();
    const { theme } = useTheme();
    
    const { control, handleSubmit, watch } = useForm<Vacancy>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: vacancy
    });
    
    const values = watch(['name', 'status', 'contactPerson', 'contactPhone']);
    
    useEffect(() => {
        const { name, status, contactPerson, contactPhone } = vacancy;
        setIsEdited(
            values[0] !== name ||
            values[1] !== status ||
            values[2] !== contactPerson ||
            values[3] !== contactPhone
        );
    }, [values]);
    
    const handleClose = async () => {
        await fetchVacancies().then(() => onClose());
    };
    
    const onSubmit = async (data: Vacancy) => {
        const { name, status, contactPerson, contactPhone } = data;
        const vacancyData: VacancyData = {};
        
        name && (vacancyData.name = name.trim());
        status && (vacancyData.status = status);
        if (removeContacts) {
            vacancyData.contactPerson = null;
            vacancyData.contactPhone = null;
        } else {
            contactPerson && (vacancyData.contactPerson = contactPerson.trim());
            contactPhone && (vacancyData.contactPhone = contactPhone.trim());
        }
        
        await updateVacancy(vacancy.id, { ...vacancy, ...vacancyData }).then(handleClose);
    };
    
    return (
        <Modal size={ 'lg' } isOpen={ isOpen } onClose={ onClose } className={ `${ theme } text-foreground` } placement={ 'top' }>
            <ModalContent>
                <ModalHeader>
                    Edit
                </ModalHeader>
                <ModalBody className={ 'mb-4' }>
                    <form onSubmit={ handleSubmit(onSubmit) }>
                        <VacancyTags isActive={ vacancy.isActive } />
                        <div className={ 'flex gap-3' }>
                            <Input className={ 'mb-2' } control={ control } name='name' label='Title' />
                            <Link href={ vacancy.link } isExternal showAnchorIcon color={ 'foreground' } />
                        </div>
                        <VacancySalary className={ 'mb-5' } salary={ vacancy.salary } salaryFrom={ vacancy.salaryFrom } salaryTo={ vacancy.salaryTo } />
                        <p className='text-indigo-500 italic mb-5'>{ vacancy.companyName }</p>
                        
                        <Select className={ 'mb-2' } name={ 'status' } label={ 'Status' } control={ control } defaultValue={ vacancy.status } />
                        <Checkbox
                            name={ 'remove info' }
                            className={ 'mb-2' }
                            color={ 'default' }
                            isSelected={ removeContacts }
                            onChange={ () => setRemoveContacts(prevState => !prevState) }
                        >
                            Remove contacts info
                        </Checkbox>
                        
                        {
                            !removeContacts && (
                                <div className={ 'flex flex-wrap  gap-2 justify-between mb-5' }>
                                    <Input className={ 'w-full sm:w-52' } control={ control } name='contactPerson' label='Person' />
                                    <Input className={ 'w-full sm:w-52' } control={ control } name='contactPhone' label='Phone' type={ 'tel' } />
                                </div>
                            )
                        }
                        
                        <p className='text-gray-400 mb-5'>Creation date: { vacancy.date.toLocaleDateString() }</p>
                        <div className={ 'flex flex-wrap gap-5 h-auto justify-start sm:justify-end mb-1' }>
                            <Button
                                className={ 'justify-start text-gray-400 hover:text-primary gap-1 px-5' }
                                isDisabled={ !isEdited }
                                variant='ghost'
                                size={ 'md' }
                                type={ 'submit' }
                                startContent={ <EditDocumentIcon className='w-full h-5 text-primary' /> }
                            >
                                <p className={ 'text-start' }>Apply</p>
                            </Button>
                            <Button
                                className={ 'justify-start text-gray-400 hover:text-danger gap-1 px-5' }
                                size={ 'md' }
                                variant='ghost'
                                onPress={ onModalOpen }
                                startContent={ <DeleteDocumentIcon className='w-full h-5 text-danger' /> }
                            >
                                <p className={ 'text-start' }>Delete file</p>
                            </Button>
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};