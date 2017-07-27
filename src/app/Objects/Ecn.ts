
import {Iecn} from './Iecn';
import {Icomment} from './Icomment';

export class Ecn implements Iecn
{
     id: number;
    ecnNo: string;
    description: string;
    status: string;
    priority: number;
    resource: string;
    tags: string;
    comments: Icomment[];
}