import { Viewer } from './viewer';
import { Attachment } from './attachment';
import { Document } from '../services/fire.service';
import { User } from './user';
import { Project } from './project';
import { Comment } from './comment';
import { TaskReference } from './task-reference';

export interface Task extends Document{
    id ?: string,
    taskid?:string;
    title ?: string,
    assignee ?: User,
    completed ?: boolean,
    descp?: string,
    owner?: User,
    project?: Project,
    references?: TaskReference[],
    startdate?: any,
    enddate?: any,
    priority: string,
    extensionDate?: any,
    commets?: Comment[],
    type?: string,
    status?: string,
    attachments?:Attachment[];
    reviewer?:Viewer[];
}