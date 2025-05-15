import { pick } from 'lodash';
import { Platform, Vacancy } from '../types.ts';

export const getVacancyData = async (id: string, platform: Platform) => {
    const raw = platform === 'robota'
        ? await fetch(`https://api.robota.ua/vacancy?id=${ id }`).then(r => r.json())
        : platform === 'work'
            ? await fetch(`https://api.robota.ua/vacancy?id=${ id }`).then(r => r.json())
            : null;
    
    if (!raw) throw Error(`Unable to get Vacancy Data for ${ id }`);
    
    const vacancy: Vacancy = pick(raw, [
        'id',
        'name',
        'companyName',
        'contactPerson',
        'contactPhone',
        'date',
        'createAt',
        'dateTxt',
        'isActive',
        'isApply',
        'salary',
        'salaryFrom',
        'salaryTo',
        'link',
        'tags',
        'status',
        'platform'
    ]);
    
    return {
        ...vacancy,
        id: String(raw.id),
        date: new Date(raw.date)
    };
};