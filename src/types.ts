export type Vacancy = {
    id: string,
    name: string,
    companyName: string,
    contactPerson: string,
    contactPhone: string,
    date: Date,
    createAt: Date,
    dateTxt: string,
    isActive: boolean,
    isApply: boolean,
    salary: number,
    salaryFrom: number,
    salaryTo: number,
    link: string,
    tags: string[],
    status: Status,
    platform: Platform
}

export type Platform = 'robota' | 'work' | 'other'
export type Status = 'Not set' | 'Sent' | 'Seen' | 'Offer' | 'Rejected'
export const statuses: Status[] = ['Not set', 'Sent', 'Seen', 'Offer', 'Rejected'];