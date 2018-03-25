import { Component, OnInit } from '@angular/core';

import {Observable} from 'rxjs/Observable'
import {ActivatedRoute, ParamMap} from '@angular/router'
import 'rxjs/add/operator/switchMap'


import {Iecn} from '../Objects/Iecn'
import {EcnService} from '../Services/ecnService'
import {GoogleChartsService} from '../Google Charts/google-charts.service'

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
              private _route: ActivatedRoute,
              private _chartService: GoogleChartsService) { }


  setData(): void{

      //.concat.apply flattens the array
      //get the earliest status date (this will be project start date)
       let startDate =[].concat.apply([], this.ecns.map(e=>e.statusHistory.map(sh=>sh.statusDate))).sort((d1,d2)=>{
      if(d1>d2){return 1}
      else if (d1<d2) {return -1}
      else return 0
    }).shift()

    //.concat.apply flattens the array
    this.timelineData = [].concat.apply([],this.ecns.filter(e=>e.statusHistory!=null&&e.statusHistory.length>0)
    .map(e=>e.statusHistory
    .sort((d1,d2)=>{
      if(d1.statusDate>d2.statusDate){return 1}
      else if (d1.statusDate<d2.statusDate) {return -1}
      else return 0
    })
    .map((s,i,arr)=>
    { let len = arr.length-1;
        return (i<len)?
        //if not last element, then end date is status date of next element
        [s.ecnNo, s.status, new Date(s.statusDate),new Date( arr[i+1].statusDate)]: 
        //else, if last element
        (s.statusId==9)?  //if Implemented then set duration of Implemented status to 1day
        [s.ecnNo, s.status, new Date(s.statusDate), new Date(s.statusDate).setDate(new Date(s.statusDate).getDate() + 1)]:        
        //else, the current status is till current date
        [s.ecnNo, s.status, new Date(s.statusDate), new Date()]        
      })))


    //Add Overall project timeline data to the data
    this.timelineData.unshift(['Project', 'Projet Timeline', new Date(startDate), new Date(2018,6,15)])
    //Add Column names to the data
    this.timelineData.unshift([{type: 'string', id: 'ECN'}, {type:'string', id:'Status'}, 
                              {type: 'datetime', id:'Start'}, {type:'datetime', id:'End'}])

    //Call google chart services to create chart
    this._chartService.buildTimelineChart(this.elementId, this.timelineData, {
      timeline: { groupByRowLabel: true }
    });


;  }

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
