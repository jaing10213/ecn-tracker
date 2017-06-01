import {Icomment} from '../Objects/Icomment';

export interface Iecn{
    ecnNo: string;
    description: string;
    status: string;
    priority: number;
    resource: string;
    tags: string;
    comments: Icomment[];

}