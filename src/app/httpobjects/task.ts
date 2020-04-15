import { Attachment } from './attachment';
import { Document } from '../services/fire.service';
import { User } from './user';
import { Project } from './project';
import { Comment } from './comment';

export interface Task extends Document{
    id ?: string,
    taskid?:string;
    title ?: string,
    assignee ?: User,
    completed ?: boolean,
    descp?: string,
    owner?: User,
    project?: Project,
    references?: string[],
    startdate?: any,
    enddate?: any,
    priority: string,
    extensionDate?: any,
    commets?: Comment[],
    type?: string,
    status?: string,
    attachments?:Attachment[];
}