import {Icomment} from '../Objects/Icomment';

export interface Iecn{
    id: number;
    ecnNo: string;
    description: string;
    status: string;
    projectId: number;
    origintorId: number;
    currentWorkerId?: number;
    priority: number;
    resource: string;
    tags: string;
    comments: Icomment[];

}