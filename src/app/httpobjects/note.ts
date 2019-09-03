import { Document } from '../services/fire.service';
import { User } from './user';

export interface Note extends Document{
    id?: string;
    title?: string;
    note?: string;
    auther?: User;
}
