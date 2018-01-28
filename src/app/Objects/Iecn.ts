import {Icomment} from '../Objects/Icomment';

export interface Iecn{
    id: number;
    ecnNo: string;
    isTask: boolean;
    title: string;
    description: string;
    status: string;
    projectId: number;
    projectName?: string;
    originatorId: number;
    currentWorkerId?: number;
    currentWorkerName?: string;
    priority: number;
    statusDate: Date;
    startDate: Date;
    endDate: Date;
    tags: string;
    comments: Icomment[];    
    userList: {Key: number, Value:string}[];
    projectList: {Key: number, Value: string}[];
}