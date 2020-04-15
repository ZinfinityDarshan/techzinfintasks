import { Document } from '../services/fire.service';
import { User } from './user';

export interface Comment extends Document{

    comment:string;
    ondate:any;
    user: User;
    taskid:string;
    tempProfilePic?: any;
}