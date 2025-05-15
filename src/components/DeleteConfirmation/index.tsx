import * as React from 'react';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';

import { useVacanciesStore } from '../../stores/useVacanciesStore.ts';
import { useTheme } from '../../hooks';

type DeleteConfirmationProps = {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    vacancyId: string
};

export const DeleteConfirmation = ({ className, isOpen, onClose, vacancyId }: DeleteConfirmationProps) => {
    const deleteVacancy = useVacanciesStore(state => state.deleteVacancy);
    const { theme } = useTheme();
    
    const handleDelete = async () => {
        await deleteVacancy(vacancyId).then(() => onClose());
    };
    
    return (
        <Modal className={ `${ className } ${ theme } text-foreground` } isOpen={ isOpen } onClose={ onClose } placement={ 'center' }>
            <ModalContent>
                <ModalHeader>
                    Confirm delete
                </ModalHeader>
                <ModalBody>
                    Are you sure you want permanently delete this vacancy ({ vacancyId })?
                </ModalBody>
                <ModalFooter>
                    <Button variant='light' onPress={ onClose }>
                        Close
                    </Button>
                    <Button color='danger' onPress={ handleDelete }>
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};