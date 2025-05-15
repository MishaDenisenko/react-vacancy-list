import { create } from 'zustand';
import { Vacancy } from '../types.ts';


type State = {
    inputValue: string,
    vacancyData: Vacancy | null
}

type Action = {
    setVacancyData: (vacancyData: Vacancy) => void,
    setInputValue: (value: string) => void,
    resetForm: () => void,
}

export const useParsedVacancy = create<State & Action>((setState, getState) => ({
    vacancyData: null,
    inputValue: '',
    setVacancyData: (vacancyData: Vacancy) => setState((state) => ({ ...state, vacancyData })),
    setInputValue: (value: string) => setState((state) => ({ ...state, inputValue: value })),
    resetForm: () => {
        const { setVacancyData, setInputValue } = getState();
        setVacancyData(null);
        setInputValue('');
    }
}));