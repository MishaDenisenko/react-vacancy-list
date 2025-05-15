import { addToast } from '@heroui/react';
import { create as createState } from 'zustand';

import { getByFilters, remove, create, update } from '../servises/vacancy-service.ts';
import { Vacancy } from '../types.ts';


type Filters = {
    sorting: 'asc' | 'desc';
    limit: number
}

type State = {
    vacancies: Vacancy[],
    
    totalPages: number,
    currentPage: number,
    filters: Filters,
    searchQuery: string;
    
    isLoading: boolean;
}

type Action = {
    fetchVacancies: () => Promise<void>,
    deleteVacancy: (id: string) => Promise<void>,
    createVacancy: (vacancy: Vacancy) => Promise<void>,
    updateVacancy: (id: string, updates: Vacancy) => Promise<void>,
    
    setCurrentPage: (page: number) => void,
    setFilters: (filters: State['filters']) => void,
    setSearchQuery: (query: string) => void;
    
    setIsLoading: (isLoading: boolean) => void,
}

export const useVacanciesStore = createState<State & Action>((setState, getState) => ({
    vacancies: [],
    totalPages: 1,
    currentPage: 1,
    filters: {
        sorting: 'asc' as State['filters']['sorting'],
        limit: 5
    },
    searchQuery: '',
    isLoading: false,
    fetchVacancies: async () => {
        const { currentPage, filters, searchQuery, setIsLoading } = getState();
        setIsLoading(true);
        const { cards, pages } = await getByFilters({ ...filters, page: currentPage, query: searchQuery });
        setState((state) => ({ ...state, vacancies: cards, totalPages: pages }));
        setIsLoading(false);
    },
    deleteVacancy: async (id: string) => {
        const { setIsLoading, fetchVacancies } = getState();
        
        setIsLoading(true);
        await remove(id)
            .then(() => addToast({
                title: 'Success',
                description: `Vacancy (${ id }) successfully deleted`,
                color: 'success',
                variant: 'bordered'
            }))
            .catch(e => addToast({
                title: 'Warning',
                description: e.message,
                color: 'warning',
                variant: 'bordered'
            }));
        await fetchVacancies();
        setIsLoading(false);
    },
    createVacancy: async (vacancy: Vacancy) => {
        const { setIsLoading } = getState();
        
        setIsLoading(true);
        await create(vacancy)
            .then(() => addToast({
                title: 'Success',
                description: `Vacancy (${ vacancy.name }) successfully added`,
                color: 'success',
                variant: 'bordered'
            }));
        
        setIsLoading(false);
    },
    updateVacancy: async (id: string, updates: Vacancy) => {
        const { setIsLoading } = getState();
        setIsLoading(true);
        
        await update(id, updates)
            .then(() => addToast({
                title: 'Success',
                description: `Successfully updated (${ updates.name }) vacancy`,
                color: 'success',
                variant: 'bordered'
            }))
            .catch(e => addToast({
                title: 'Warning',
                description: e.message,
                color: 'warning',
                variant: 'bordered'
            }));
        setIsLoading(false);
    },
    setCurrentPage: (page: number) => setState((state) => ({ ...state, currentPage: page })),
    setFilters: (filters: Filters) => setState((state) => ({ ...state, filters })),
    setSearchQuery: (query: string) => setState({ searchQuery: query }),
    setIsLoading: (isLoading: boolean) => setState((state) => ({ ...state, isLoading }))
}));
