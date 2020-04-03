import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import java from 'highlight.js/lib/languages/java';
import dart from 'highlight.js/lib/languages/dart';



export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'scss', func: scss},
    {name: 'xml', func: xml},
    {name: 'java', func: java},
    {name: 'dart', func: dart}
  ];
}


export const TaskPriority: string[] = [
    "HIGH",
    "MEDIUM",
    "LOW"
  ];
  export const Roles: string[] = ['ADMIN','DEV','MANAGEMENT','FINANCE', 'TL', 'DIRECTOR'];
  export const Wings: string[] = ['IT', 'MANAGEMENT', 'BD', 'ADMIN', 'MARKETING'];
  export const Statuses: string[] = ['active', 'inactive', 'probation', 'internship', 'permanant'];
  export const TaskType:string[]=['TASK', 'DEV', 'SUPPORT', 'PRODUCTION', 'ISSUE', 'CHANGE'];
  export const TaskStatus: string[] = ['OPEN', 'INPROGRESS', 'COMPLETED', 'CLOSED', 'PAID', 'PENDING', 'BACKLOG'];
  export const ExpenseStatus: string[] = ['PENDING', 'PAID', 'PARTIALLYPAID'];
  export const TransactionType: string[] = ['INBOUND', 'OUTBOUND'];
  export const LeavesType: string[] = ['SICK', 'CASUAL', 'VACATION'];
  // export const IMGType: string[] = ['PROFILEPIC', 'TASK', 'ATTACHEMENT'];
  export enum IMGType {
    PROFILEPIC = 'PROFILEPIC', TASK = 'TASK', ATTACHEMENT= 'ATTACHEMENT'
  }
  export enum DBTableNames{
    users='users', blog='blog', tasks='tasks', leaves='leaves', contacts='contacts',
    notes='notes'
  }