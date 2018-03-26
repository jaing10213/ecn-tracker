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
  
    this.timelineData = [].concat(...this.ecns.filter(e=>!e.isTask&&e.statusHistory!=null&&e.statusHistory.length>0)
    .map(e=> {
    let sortedstatus = e.statusHistory.sort(
      (d1,d2)=>{
        if (d1<d2) return 1
        if (d1>d2) return -1
        return 0
      }
    )
    let len = sortedstatus.length-1
    let eRes = []
    sortedstatus.forEach((sh,i, arr)=> {
    let res= {"ecnNo": e.ecnNo };      
      res[sh.status]= new Date(sh.statusDate)
        //calculate duration of each status. If last item then calculate duration from current date
     res["dur"]= (i < len)? moment.duration(moment(arr[i+1].statusDate).diff(moment(sh.statusDate))).humanize():
                      moment.duration(moment().diff(moment(sh.statusDate))).humanize()
    
        //add the item to create bar
    // ... is the spread operator below
      res["y"] =  moment.max(...(e.statusHistory.map(m=> moment(m.statusDate))))
      eRes.push(res)
      
  })
  
   return eRes;
    }))
   
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
