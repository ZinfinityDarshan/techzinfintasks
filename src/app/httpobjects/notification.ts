import { Document } from './../services/fire.service';
export interface Notification extends Document{
    id?: string,
    senderId?: string,
    receiverId?: string[],
    message?: string
    redirectionURL?: string,
    sendingDate?: any | Date
}

