import { User } from './user';
import { Document } from './../services/fire.service';
export interface ChatMessage extends Document{
    message?:string,
    sentdate?:any | Date,
    user?:User
}
