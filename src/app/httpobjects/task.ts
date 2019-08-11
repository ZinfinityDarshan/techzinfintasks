import { Document } from '../services/fire.service';
import { User } from './user';
import { Project } from './project';
import { Comment } from './comment';

export interface Task extends Document{
    id ?: string,
    title ?: string,
    assignee ?: User,
    completed ?: boolean,
    descp?: string,
    owner?: User,
    project?: Project,
    references?: string[],
    startdate?: Date,
    enddate?: Date,
    extensionDate?: Date,
    commets?: Comment[]
}