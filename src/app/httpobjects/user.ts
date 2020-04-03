import { Document } from '../services/fire.service';

export interface User extends Document{
    username ?: string,
    password ?: string,
    token ?: string,
    email ?: string,
    manager ?: string,
    status ?: string,
    wing ?: string,
    role ?: string[],
    name ?: string,
    profilepicurl ?: string
    firestoreURL?: string
}