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
      'title': 'Some ECN',
      'projectId': 1,
      'projectName': 'MM 3Ton',
      'originatorId': 1,
      'currentWorkerId': 1,
      'currentWorkerName': 'Gaurav Jain',
      'description': 'Create indoor unit sheetmetal parts',
      'status': 'CCB',
      'statusDate': new Date('11/23/2017'),
      'priority': 1,
      'tags': '',
      'userList': [],
      'projectList': [],
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
      'title': 'Some ECN',
      'projectId': 1,
      'projectName': 'MM 3Ton',
      'originatorId': 1,
      'currentWorkerId': 1,
      'currentWorkerName': 'Gaurav Jain',
      'description': 'Create indoor unit sheetmetal parts',
      'status': 'CCB',
      'statusDate': new Date('11/23/2017'),
      'priority': 1,
      'tags': '',
      'userList': [],
      'projectList': [],
      'comments': [{id:1, ecnId: 2, date: new Date('2017-05-16T00:00:00'), value: 'Created 2D drawings'},
                  {id:2, ecnId: 2, date: new Date('2017-05-19T00:00:00'), value: 'Created ECNs for all 2D drawings'}]
    },
      {
       'id': 4,
      'ecnNo': 'E362546',
      'title': 'Some ECN',
      'projectId': 1,
      'projectName': 'MM 3Ton',
      'originatorId': 1,
      'currentWorkerId': 1,
      'currentWorkerName': 'Gaurav Jain',
      'description': 'Create indoor unit sheetmetal parts',
      'status': 'CCB',
      'statusDate': new Date('11/23/2017'),
      'priority': 1,
      'tags': '',
      'userList': [],
      'projectList': [],
      'comments': [{id:1, ecnId: 3, date: new Date('1968-11-16T00:00:00'), value: 'Created 2D drawings'}]
    },
      {
      'id': 5,
       'ecnNo': 'E372404',
      'title': 'Some ECN',
      'projectId': 1,
      'projectName': 'MM 3Ton',
      'originatorId': 1,
      'currentWorkerId': 1,
      'currentWorkerName': 'Gaurav Jain',
      'description': 'Create indoor unit sheetmetal parts',
      'status': 'CCB',
      'statusDate': new Date('11/23/2017'),
      'priority': 1,
      'tags': '',
      'userList': [],
      'projectList': [],
      'comments': [{id:1, ecnId: 4, date: new Date('1968-11-16T00:00:00'), value: 'Created 2D drawings'}]
    },
      {
       'id': 6,
      'ecnNo': 'E374201',
      'title': 'Some ECN',
      'projectId': 1,
      'projectName': 'MM 3Ton',
      'originatorId': 1,
      'currentWorkerId': 1,
      'currentWorkerName': 'Gaurav Jain',
      'description': 'Create indoor unit sheetmetal parts',
      'status': 'CCB',
      'statusDate': new Date('11/23/2017'),
      'priority': 1,
      'tags': '',
      'userList': [],
      'projectList': [],
      'comments': [{id:1, ecnId: 5, date: new Date('1968-11-16T00:00:00'), value: 'Created 2D drawings'}]
    }
        ];
        return {ecns};
    }
}