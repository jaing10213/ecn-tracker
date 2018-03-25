import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable'
import {ActivatedRoute, ParamMap} from '@angular/router'
import 'rxjs/add/operator/switchMap'
import * as moment from 'moment'


import {Iecn} from '../Objects/Iecn'
import {EcnService} from '../Services/ecnService'

@Component({
  selector: 'ecn-timeline',
  templateUrl: './ecn-timeline.component.html',
  styleUrls: ['./ecn-timeline.component.css']
})
export class EcnTimelineComponent implements OnInit {

  elementId: string = 'gChart';
  ecns: Iecn[];
  uId: number;
  pId: number;
  timelineData: any[];

  constructor(private _ecnService: EcnService,
              private _route: ActivatedRoute) { }


  setData(): void{


   
    this.timelineData = this.ecns.filter(e=>!e.isTask&&e.statusHistory!=null&&e.statusHistory.length>0)
    .map(e=> {
    let res= {"ecnNo": e.ecnNo };
    e.statusHistory.forEach(sh=> res[sh.status] = new Date(sh.statusDate))
    // ... is the spread operator below
      res["y"] =  moment.max(...(e.statusHistory.map(m=> moment(m.statusDate))))
      return res
   
    })
   

 }

  customizeTooltip(arg) {
        return {
            text: "<strong>" + arg.argumentText + "</strong>" + "<br/>" + arg.seriesName + ": " + moment(arg.valueText).format('LL') + "<br/>"  + moment.duration(moment().diff(moment(arg.valueText))).humanize()
        };
    }

  ngOnInit() {
     this._route.paramMap.switchMap(params=>{
      this.uId = +params.get('uId')
      this.pId = +params.get("pId")
      return this._ecnService.getEcns(this.uId, this.pId)
    }).subscribe(ecns=>{
      this.ecns = ecns;
      this.setData();
    })
  }

}
