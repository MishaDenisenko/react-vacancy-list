import React from 'react';
import { Select, SelectItem } from '@heroui/react';

import { useVacanciesStore } from '../../stores/useVacanciesStore.ts';
import { useTheme } from '../../hooks';


export const Filters = () => {
    const { theme } = useTheme();
    
    const selects = [
        {
            name: 'limit',
            label: 'per page',
            width: 'w-16',
            items: ['1', '2', '5']
        },
        {
            name: 'sorting',
            label: 'sort by',
            width: 'w-40',
            items: ['creating asc', 'creating desc']
        }
    ];
    
    const { filters, isLoading, setFilters, setCurrentPage, fetchVacancies } = useVacanciesStore();
    
    const handleOnChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        name === 'sorting' && setFilters({ ...filters, [name]: value as 'asc' | 'desc' });
        name === 'limit' && setFilters({ ...filters, [name]: +value });
        
        setCurrentPage(1);
        await fetchVacancies();
    };
    
    return (
        <div className={ 'ml-auto flex justify-end gap-5' }>
            {
                selects.map(({ name, label, width, items }) => (
                    <Select
                        key={ name }
                        classNames={ {
                            popoverContent: `${ theme } text-foreground bg-background`,
                            mainWrapper: width
                        } }
                        name={ name }
                        className={ '' }
                        defaultSelectedKeys={ [filters[name].toString()] }
                        variant={ 'flat' }
                        onChange={ e => handleOnChange(e) }
                        label={ label }
                        labelPlacement={ 'outside-left' }
                        disallowEmptySelection
                        isDisabled={ isLoading }
                    >
                        {
                            items.map(i => (
                                <SelectItem
                                    key={ name === 'sorting' ? i.split(' ')[1] : i }
                                    textValue={ i }
                                >
                                    { i }
                                </SelectItem>))
                        }
                    </Select>
                ))
            }
        </div>
    );
};