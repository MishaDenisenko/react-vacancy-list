import { useEffect } from 'react';
import { Spinner } from '@heroui/react';

import { useVacanciesStore } from '../../stores/useVacanciesStore.ts';
import { VacancyList } from '../../components/VacancyList';
import { Search } from '../../components/Search';


export const HomePage = () => {
    const { isLoading, fetchVacancies } = useVacanciesStore();
    
    useEffect(() => {
        (async () => await fetchVacancies())();
        const interval = setInterval(async () => await fetchVacancies(), 1000 * 60 * 30);
        
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className={ 'flex flex-col pb-10 justify-center' }>
            <Search className={ 'mb-5 p-2.5' } />
            { isLoading ? (<Spinner className={ 'mt-10' } />) : (<VacancyList />) }
        </div>
    );
};