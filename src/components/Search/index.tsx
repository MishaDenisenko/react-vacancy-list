import { useCallback } from 'react';
import { debounce } from 'lodash';
import { Input } from '@heroui/react';
import { Card, CardBody } from '@heroui/card';

import { useVacanciesStore } from '../../stores/useVacanciesStore.ts';
import { SearchIcon } from '../../share/icons';
import { Filters } from '../Filters';

type SearchProps = {
    className?: string;
};

export const Search = ({ className }: SearchProps) => {
    const { searchQuery, currentPage, isLoading, fetchVacancies, setSearchQuery, setCurrentPage } = useVacanciesStore();
    
    const debouncedFetchVacancies = useCallback(debounce(fetchVacancies, 300), [fetchVacancies]);
    
    const handleOnChange = async (value: string) => {
        setSearchQuery(value);
        currentPage > 1 && setCurrentPage(1);
        await debouncedFetchVacancies();
    };
    
    return (
        <Card className={ className }>
            <CardBody>
                <Input
                    className='mb-5'
                    placeholder='Type to search...'
                    size='lg'
                    startContent={ <SearchIcon size={ 18 } /> }
                    value={ searchQuery }
                    onChange={ e => handleOnChange(e.target.value) }
                    type='search'
                    variant={ 'faded' }
                />
                <Filters />
            </CardBody>
        </Card>
    );
};