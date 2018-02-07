import {Icomment} from './Icomment';
import {IstatusHistory} from "./IstatusHistory"

export interface Iecn{
    id: number;
    ecnNo: string;
    isTask: boolean;
    title: string;
    description: string;
    statusId: number;
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
    statusHistory: IstatusHistory[];

    userList: {Key: number, Value:string}[];
    projectList: {Key: number, Value: string}[];
    statusList: {Key: number, Value: string}[];
}