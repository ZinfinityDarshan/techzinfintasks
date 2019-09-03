import { Address } from './address';

export interface Contact extends Document{
    name?: string;
    id?: string;
    contactno?: number[];
    phoneno?: number[];
    address?: Address;
    company?:string;
    businesscard?: string;
    officeaddress?: Address;
    business?:string[];
    tags?:string[];
}
