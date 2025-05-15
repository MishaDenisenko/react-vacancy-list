import React, { useCallback, useRef } from 'react';
import { addToast, Button, Input } from '@heroui/react';
import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';

import { getVacancyData } from '../../servises/api.ts';
import { getIdAndPlatformFromLink } from '../../utils/vacancy-link-converter.ts';
import { useParsedVacancy } from '../../stores/useParsedVacancy.ts';
import { useVacanciesStore } from '../../stores/useVacanciesStore.ts';
import { VacancyContacts, VacancySalary, VacancyTags, VacancyTitle } from '../../components/VacancyCardInfo';
import { SearchIcon } from '../../share/icons';


export const AddVacancy = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    
    const { vacancyData, inputValue, setVacancyData, setInputValue, resetForm } = useParsedVacancy();
    const { createVacancy } = useVacanciesStore();
    
    const handleBrowse = useCallback(() => {
        (async () => {
            const link = inputRef.current?.value;
            
            const data = getIdAndPlatformFromLink(link);
            if (!data) return;
            
            const { id, platform } = data;
            const res = await getVacancyData(id, platform).catch(e => addToast({
                title: 'Warning',
                description: e.message,
                color: 'warning',
                variant: 'bordered'
            }));
            
            res && setVacancyData({
                ...res,
                link,
                platform
            });
        })();
    }, [setVacancyData]);
    
    const handleAddVacancy = useCallback(() => {
        (async () => await createVacancy(vacancyData)
            .catch(e => addToast({
                title: 'Warning',
                description: e.message,
                color: 'warning',
                variant: 'bordered'
            }))
            .then(() => resetForm()))();
    }, [vacancyData, resetForm, createVacancy]);
    
    return (
        <Card className='mx-auto p-2.5'>
            <CardHeader className='flex gap-5 w-full'>
                <Input
                    value={ inputValue }
                    onChange={ e => setInputValue(e.target.value) }
                    classNames={ { input: 'pr-8' } }
                    ref={ inputRef }
                    isRequired
                    placeholder='Enter link'
                    type='url'
                    variant='faded'
                    isClearable
                    onClear={ () => setInputValue('') }
                />
                <Button className='min-w-3 mb-auto' color='default' variant='flat' onPress={ handleBrowse }>
                    <SearchIcon size={ 18 } />
                </Button>
            </CardHeader>
            { vacancyData && (
                <>
                    <CardBody>
                        <VacancyTags isActive={ vacancyData.isActive } />
                        <div className='w-full flex gap-3'>
                            <VacancyTitle name={ vacancyData.name } platform={ vacancyData.platform } />
                        </div>
                        <VacancySalary className={ 'mb-5' } salary={ vacancyData.salary } salaryFrom={ vacancyData.salaryFrom } salaryTo={ vacancyData.salaryTo } />
                        <p className='text-indigo-500 italic mb-5'>{ vacancyData.companyName }</p>
                        <VacancyContacts contactPerson={ vacancyData.contactPerson } contactPhone={ vacancyData.contactPhone } />
                        <p className='text-gray-400'>Creation date: { vacancyData.date.toLocaleDateString() }</p>
                    </CardBody>
                    <CardFooter className='flex gap-2 w-full justify-end'>
                        <Button color='danger' variant='flat' onPress={ resetForm }>Reset</Button>
                        <Button color='success' variant='flat' onPress={ handleAddVacancy }>Add</Button>
                    </CardFooter>
                </>
            ) }
        </Card>
    );
};