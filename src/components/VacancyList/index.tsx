import * as React from 'react';
import { Pagination } from '@heroui/react';

import { Empty } from '../Empty';
import { Card } from '../Card';
import { useVacanciesStore } from '../../stores/useVacanciesStore.ts';
import { Vacancy } from '../../types.ts';

type VacancyListProps = {
    className?: string;
};

export const VacancyList = ({ className }: VacancyListProps) => {
    const { vacancies, currentPage, totalPages, fetchVacancies, setCurrentPage } = useVacanciesStore();
    
    const handleChangePage = async (page: number) => {
        setCurrentPage(page);
        await fetchVacancies();
    };
    
    
    return (
        <div className={ className }>
            { !vacancies.length && <Empty /> }
            { vacancies.map(
                (v: Vacancy) => <Card key={ v.id } vacancy={ v } className='mb-5 w-full px-4 py-2.5' />
            ) }
            {
                totalPages > 1 && <Pagination
                    className={ 'justify-items-center' }
                    radius={ 'full' }
                    color={ 'default' }
                    showControls={ true }
                    isDisabled={ !vacancies.length }
                    total={ totalPages }
                    onChange={ (p) => handleChangePage(p) }
                    page={ currentPage }
                />
            }
        </div>
    );
};