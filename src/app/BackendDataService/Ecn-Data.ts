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
      'projectId': 1,
      'origintorId': 1,
      'currentWorkerId': 1,
      'description': 'Create indoor unit sheetmetal parts',
      'status': 'CCB',
      'priority': 1,
      'tags': '',
      'resource': 'Jim Fowler',
      'comments': [{id:6, ecnId: 1, date: new Date('1968-11-16T00:00:00'), value: 'Created 2D drawings for the new 3Ton compressor models which were supplied by the Copelad'},
      {id:1, ecnId: 1, date: new Date('2017-05-19T00:00:00'), value: 'Created ECNs for all 2D drawings'},
      {id:2, ecnId: 1, date: new Date('2017-05-19T00:00:00'), value: 'Created ECNs for all 2D drawings'},
      {id:3, ecnId: 1, date: new Date('2017-05-19T00:00:00'), value: 'Created ECNs for all 2D drawings'},
      {id:4, ecnId: 1, date: new Date('2017-05-19T00:00:00'), value: 'Created ECNs for all 2D drawings'},
      {id:5, ecnId: 1, date: new Date('2017-05-19T00:00:00'), value: 'Created ECNs for all 2D drawings'}
      ]
    },
      {
      'id': 3,
      'ecnNo': 'E373543',
      'projectId': 1,
      'origintorId': 1,
      'currentWorkerId': 1,
      'description': 'Fix EP door panel',
      'status': 'pending',
      'tags': '',
      'priority': 2,
      'resource': 'Meng Lei',
      'comments': [{id:1, ecnId: 2, date: new Date('2017-05-16T00:00:00'), value: 'Created 2D drawings'},
                  {id:2, ecnId: 2, date: new Date('2017-05-19T00:00:00'), value: 'Created ECNs for all 2D drawings'}]
    },
      {
       'id': 4,
      'ecnNo': 'E362546',
      'projectId': 1,
      'origintorId': 1,
      'currentWorkerId': 1,
      'description': 'Create EPB options',
      'status': 'Submitted',
      'tags': '',
      'priority': 3,
      'resource': 'Darren Varga',
      'comments': [{id:1, ecnId: 3, date: new Date('1968-11-16T00:00:00'), value: 'Created 2D drawings'}]
    },
      {
      'id': 5,
       'ecnNo': 'E372404',
      'projectId': 1,
      'origintorId': 1,
      'currentWorkerId': 1,
      'description': 'Create Control Options',
      'status': 'Implemented',
      'tags': '',
      'priority': 1,
      'resource': 'Darren Varga',
      'comments': [{id:1, ecnId: 4, date: new Date('1968-11-16T00:00:00'), value: 'Created 2D drawings'}]
    },
      {
       'id': 6,
      'ecnNo': 'E374201',
      'projectId': 1,
      'origintorId': 1,
      'currentWorkerId': 1,
      'description': 'high Ambient Sheetmetal Parts',
      'status': 'Unassigned',
      'tags': '',
      'priority': 13,
      'resource': 'Meng Lei',
      'comments': [{id:1, ecnId: 5, date: new Date('1968-11-16T00:00:00'), value: 'Created 2D drawings'}]
    }
        ];
        return {ecns};
    }
}