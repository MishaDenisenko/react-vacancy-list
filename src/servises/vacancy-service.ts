import { Vacancy } from '../types.ts';

export const API_URL = 'http://localhost:3000/vacancies';

const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));

export const getAll = async (): Promise<Vacancy[]> => {
    const res = await delay(200).then(() => fetch(API_URL).catch(e => console.log(e)));
    
    if (!res) return;
    
    const data = await res.json();
    
    return data.map(v => ({
        ...v,
        date: new Date(v.date)
    }));
};

export const getByFilters = async ({ page = 1, limit, sorting, query = '' }): Promise<{
    cards: Vacancy[],
    pages: number
}> => {
    const url = `${ API_URL }?q=${ query }&_page=${ page }&_limit=${ limit }&_sort=createAt&_order=${ sorting }`;
    
    const res = await delay(200).then(() => fetch(url).catch(e => console.log(e)));
    
    if (!res) return;
    
    const data = await res.json();
    const totalCount = +res.headers.get('X-Total-Count');
    
    const cards = data.map(v => ({
        ...v,
        date: new Date(v.date)
    }));
    
    return {
        cards,
        pages: Math.ceil(totalCount / limit)
    };
};

export const create = async (vacancy: Vacancy): Promise<string> => {
    const exist = await fetch(`${ API_URL }/${ vacancy.id }`).then(({ ok }) => ok);
    if (exist) throw new Error(`Vacancy (${vacancy.name}) with the same id already exists`);
    
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...vacancy,
            createAt: new Date(),
            status: 'Not set'
        })
    })
        .then(r => r.json())
        .then(data => data.id);
};

export const update = async (id: string, updates: Vacancy): Promise<boolean> => {
    try {
        return await fetch(`${ API_URL }/${ id }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updates)
        }).then(r => r.ok);
    } catch (error) {
        console.log('Error updating vacancy:', error);
        return false;
    }
};

export const remove = async (id: string): Promise<boolean> => {
    try {
        return await fetch(`${ API_URL }/${ id }`, { method: 'DELETE' }).then(r => r.ok);
    } catch (error) {
        console.log('Error due removing vacancy:', error);
        return false;
    }
};

