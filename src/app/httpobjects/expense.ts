import { User } from './user';

export interface Expense {
    id?: string;
    title?: string;
    amt?: string;
    currency?:string;
    ondate?: string;
    whopaid?: User;
    status?: string;
}
