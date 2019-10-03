import { User } from './user';

export interface Expense {
    id?: string;
    title?: string;
    amt?: string;
    currency?:string;
    ondate?: any;
    whopaid?: User;
    status?: string;
    recievingentity?: string;
    transactionid?: string;
    transactiontype?: string;
}
