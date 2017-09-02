import {Icomment} from '../Objects/Icomment';

export interface Iecn{
    id: number;
    ecnNo: string;
    description: string;
    status: string;
    projectId: number;
    origintorId: number;
    currentWorkerId?: number;
    currentworkerName?: string;
    priority: number;
    tags: string;
    comments: Icomment[];

}