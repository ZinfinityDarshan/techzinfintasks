import { Document } from '../services/fire.service';
import { User } from './user';

export interface Leave extends Document{

    startdate: any;
    enddate: any;
    type:string;
    user: User
}
