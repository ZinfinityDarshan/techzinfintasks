import { Document } from '../services/fire.service';
import { User } from './user';

export interface Project extends Document{
    id ?: string,
    cost?:string,
    name?:string,
    client: string,
    lead?: User,
    manager?: User,
    active?:boolean
}