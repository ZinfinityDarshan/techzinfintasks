import { Document } from '../services/fire.service';
import { User } from './user';

export interface Blog extends Document{

    id?: string;
    title?: string;
    blog?: any;
    auther?: User;
    publishDate?: any;
    tags?: string[];

}
