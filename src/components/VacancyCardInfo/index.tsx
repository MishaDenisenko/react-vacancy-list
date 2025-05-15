import { Divider } from '@heroui/react';

import { PlatformImage } from '../PlatformImage';
import { StatusChip } from '../StatusChip';
import { Platform, Status } from '../../types.ts';


type VacancyTitleProps = {
    className?: string;
    name: string;
    platform?: Platform
    onClick?: () => void
};

export const VacancyTitle = ({ className, name, platform, onClick }: VacancyTitleProps) => {
    return (
        <>
            <p className={ `${ className } text-nowrap font-bold text-xl overflow-hidden text-ellipsis` } onClick={ onClick ? () => onClick() : null }>{ name }</p>
            <PlatformImage platform={ platform } />
        </>
    );
};

type VacancySalaryProps = {
    className?: string;
    salary?: number,
    salaryFrom?: number
    salaryTo?: number
};

export const VacancySalary = ({ className, salary, salaryFrom, salaryTo }: VacancySalaryProps) => {
    return (
        <p className={ `${ className } tabular-nums text-gray-400` }>
            {
                salary > 0
                    ? `₴ ${ salary }`
                    : salaryFrom ? `₴ ${ salaryFrom } - ${ salaryTo }`
                        : 'By results'
            }
        </p>
    );
};

type VacancyContactsProps = {
    className?: string;
    contactPerson?: string,
    contactPhone?: string
};

export const VacancyContacts = ({ contactPerson, contactPhone }: VacancyContactsProps) => {
    return (
        <div className='flex gap-5 items-center'>
            { contactPerson && <p>{ contactPerson }</p> }
            { contactPerson && contactPhone && <Divider orientation='vertical' className='h-5' /> }
            { contactPhone && <p>{ contactPhone }</p> }
            
            { !contactPerson && !contactPhone && <p className={ 'text-gray-400' }>No contact info</p> }
        </div>
    );
};

type VacancyTagsProps = {
    className?: string;
    isActive: boolean;
    status?: Status
};

export const VacancyTags = ({ isActive, status }: VacancyTagsProps) => {
    return (
        <div className='my-auto mb-1 flex gap-2'>
            { !isActive && (
                <StatusChip>
                    <p>Vacancy is over</p>
                </StatusChip>
            ) }
            { status && (
                <StatusChip status={ status }>
                    { status }
                </StatusChip>
            ) }
        </div>
    );
};
