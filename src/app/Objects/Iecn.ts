import {Icomment} from '../Objects/Icomment';

export interface Iecn{
    id: number;
    ecnNo: string;
    description: string;
    status: string;
    projectId: number;
    originatorId: number;
    currentWorkerId?: number;
    currentWorkerName?: string;
    priority: number;
    tags: string;
    comments: Icomment[];    
    userList: {Key: number, Value:string}[];
    projectList: {Key: number, Value: string}[];
}