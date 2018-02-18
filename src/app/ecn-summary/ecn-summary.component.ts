import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/switchMap'
import * as moment from 'moment'

import {EcnService} from '../Services/ecnService'
import {Iecn} from '../Objects/Iecn'
import {StatusCountPipe} from '../ecn-list/status-count.pipe'

@Component({
  selector: 'ecn-summary',
  templateUrl: './ecn-summary.component.html',
  styleUrls: ['./ecn-summary.component.css'],
})
export class EcnSummaryComponent implements OnInit {

  pId: number  =0 ;
  uId: number = 0;
  statusData: any;
  ecnData: any;


  statusPipe: StatusCountPipe = new StatusCountPipe();

  constructor(private _route: ActivatedRoute,
              private _service: EcnService) { }


  private setEcnData(ecns: Iecn[]) {

    this.statusData = this.statusPipe.transform(ecns.filter(e=>!e.isTask), new Date(), moment(new Date()).subtract(7,"days").toDate());
  }

  ngOnInit() {

    this._route.paramMap.switchMap((params: ParamMap)=> {
      this.pId = +params.get('pId');
      this.uId = +params.get ('uId');

      return this._service.getEcns(this.uId, this.pId);

    })
    .subscribe( (ecns: Iecn[])=>{
      this.ecnData = ecns.filter(e=> !e.isTask && ((e.statusId==1)||(e.statusId==2)||(e.statusId==4))).map(e=> {return {
        ecnNo: e.ecnNo, 
        description: e.description,
        status: e.status,
        lastComment: (e.comments.length>0)? moment(e.comments[0].date).format("ll") + ": " + e.comments[0].value: null
      }});
      this.setEcnData(ecns);
      
    })
  }


}
