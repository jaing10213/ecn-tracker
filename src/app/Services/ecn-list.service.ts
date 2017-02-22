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
      'resource': 'Jim Fowler',
      'comments': ['Nothing new']
    },
      {
      'ecnNo': 'E373543',
      'description': 'Create outdoor unit piping parts',
      'status': 'pending',
      'resource': 'Meng Lei',
      'comments': ['Meng Lei to make the requested changes']
    },
      {
      'ecnNo': 'E362546',
      'description': 'Create EPB options',
      'status': 'Submitted',
      'resource': 'Darren Varga',
      'comments': ['Submitted to CCB', 'Waiting to be moved to CCB']
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

