import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Iecn} from '../Objects/Iecn';

export class EcnData implements InMemoryDbService
{
    createDb ()
     {
        let ecns: Iecn[] = [
    {
      'id': 1,
      'ecnNo': 'E362178',
      'description': 'Create indoor unit sheetmetal parts',
      'status': 'CCB',
      'priority': 1,
      'tags': '',
      'resource': 'Jim Fowler',
      'comments': [{date: new Date('1968-11-16T00:00:00'), comment: 'Created 2D drawings for the new 3Ton compressor models which were supplied by the Copelad'},
      {date: new Date('2017-05-19T00:00:00'), comment: 'Created ECNs for all 2D drawings'},
      {date: new Date('2017-05-19T00:00:00'), comment: 'Created ECNs for all 2D drawings'},
      {date: new Date('2017-05-19T00:00:00'), comment: 'Created ECNs for all 2D drawings'}]
    },
      {
      'id': 3,
      'ecnNo': 'E373543',
      'description': 'Create outdoor unit piping parts',
      'status': 'pending',
      'tags': '',
      'priority': 2,
      'resource': 'Meng Lei',
      'comments': [{date: new Date('2017-05-16T00:00:00'), comment: 'Created 2D drawings'},
                  {date: new Date('2017-05-19T00:00:00'), comment: 'Created ECNs for all 2D drawings'}]
    },
      {
       'id': 4,
      'ecnNo': 'E362546',
      'description': 'Create EPB options',
      'status': 'Submitted',
      'tags': '',
      'priority': 3,
      'resource': 'Darren Varga',
      'comments': [{date: new Date('1968-11-16T00:00:00'), comment: 'Created 2D drawings'}]
    },
      {
      'id': 5,
       'ecnNo': 'E372404',
      'description': 'Create Control Options',
      'status': 'Implemented',
      'tags': '',
      'priority': 1,
      'resource': 'Darren Varga',
      'comments': [{date: new Date('1968-11-16T00:00:00'), comment: 'Created 2D drawings'}]
    },
      {
       'id': 6,
      'ecnNo': 'E374201',
      'description': 'high Ambient Sheetmetal Parts',
      'status': 'Unassigned',
      'tags': '',
      'priority': 13,
      'resource': 'Meng Lei',
      'comments': [{date: new Date('1968-11-16T00:00:00'), comment: 'Created 2D drawings'}]
    }
        ];
        return ecns;
    }
}