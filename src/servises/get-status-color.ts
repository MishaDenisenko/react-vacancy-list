import { Status } from '../types.ts';


export const getStatusColor = (status: Status): 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' => {
    switch (status) {
        case 'Not set':
            return 'default';
        case 'Sent':
            return 'primary';
        case 'Seen':
            return 'secondary';
        case 'Offer':
            return 'success';
        case 'Rejected':
            return 'danger';
    }
};