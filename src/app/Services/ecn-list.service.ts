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
      'comments': [{date: new Date('1968-11-16T00:00:00'), comment: 'Created 2D drawings for the new 3Ton compressor models which were supplied by the Copelad'}]
    },
      {
      'ecnNo': 'E373543',
      'description': 'Create outdoor unit piping parts',
      'status': 'pending',
      'priority': 2,
      'resource': 'Meng Lei',
      'comments': [{date: new Date('2017-05-16T00:00:00'), comment: 'Created 2D drawings'},
                  {date: new Date('2017-05-19T00:00:00'), comment: 'Created ECNs for all 2D drawings'}]
    },
      {
      'ecnNo': 'E362546',
      'description': 'Create EPB options',
      'status': 'Submitted',
      'priority': 3,
      'resource': 'Darren Varga',
      'comments': [{date: new Date('1968-11-16T00:00:00'), comment: 'Created 2D drawings'}]
    },
      {
      'ecnNo': 'E372404',
      'description': 'Create Control Options',
      'status': 'Implemented',
      'priority': 1,
      'resource': 'Darren Varga',
      'comments': [{date: new Date('1968-11-16T00:00:00'), comment: 'Created 2D drawings'}]
    },
      {
      'ecnNo': 'E374201',
      'description': 'high Ambient Sheetmetal Parts',
      'status': 'Unassigned',
      'priority': 13,
      'resource': 'Meng Lei',
      'comments': [{date: new Date('1968-11-16T00:00:00'), comment: 'Created 2D drawings'}]
    }
  ];
    };

    getEcn(id: number): Iecn{
       if (id < this.getEcns().length)
        {
        
          return this.getEcns()[id];
        }
      return;
    }

}

