import {Injectable} from '@angular/core';
import {Iecn} from '../ecn/Iecn';

@Injectable()
export class EcnService{

    getEcns(): Iecn[] {
        return [
    {
      'ecnNo': 'E362178',
      'description': 'Create indoor unit sheetmetal parts',
      'status': 'CCB',
      'priority': 1,
      'resource': 'Jim Fowler',
      'comments': ['Nothing new']
    },
      {
      'ecnNo': 'E373543',
      'description': 'Create outdoor unit piping parts',
      'status': 'pending',
      'priority': 2,
      'resource': 'Meng Lei',
      'comments': ['Meng Lei to make the requested changes']
    },
      {
      'ecnNo': 'E362546',
      'description': 'Create EPB options',
      'status': 'Submitted',
      'priority': 3,
      'resource': 'Darren Varga',
      'comments': ['Submitted to CCB', 'Waiting to be moved to CCB']
    },
      {
      'ecnNo': 'E372404',
      'description': 'Create Control Options',
      'status': 'Implemented',
      'priority': 1,
      'resource': 'Darren Varga',
      'comments': ['Submitted to CCB', 'In CCB', 'Implemented']
    },
      {
      'ecnNo': 'E374201',
      'description': 'high Ambient Sheetmetal Parts',
      'status': 'Unassigned',
      'priority': 13,
      'resource': 'Meng Lei',
      'comments': ['Needs to be set-up']
    }
  ];
    };

    getEcn(id: number): Iecn{
        if (id < this.getEcns.length)
        {
          return this.getEcns[id];
        }
      return;
    }

}

