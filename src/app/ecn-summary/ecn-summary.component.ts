import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/switchMap'
import * as moment from 'moment'

import {EcnService} from '../Services/ecnService'
import {Iecn} from '../Objects/Iecn'
import {Icomment} from '../Objects/Icomment'
import {StatusCountPipe} from '../ecn-list/status-count.pipe'
import {BarChartConfig} from '../Google Charts/Configs/BarChartConfig'
import {GoogleChartsService} from '../Google Charts/google-charts.service'

@Component({
  selector: 'ecn-summary',
  templateUrl: './ecn-summary.component.html',
  styleUrls: ['./ecn-summary.component.css'],
})
export class EcnSummaryComponent implements OnInit {

  pId: number  =0 ;
  uId: number = 0;
  statusData: {Key:string, currValue:number, pastValue: number}[];
  ecnData: any[];
  ecnDataCCB: any[];
  sumPastValue: number;
  sumCurrValue: number;

  config: BarChartConfig;
  elementId: string;
  data: any[];
  latestComment: Icomment;

  statusPipe: StatusCountPipe = new StatusCountPipe();

  constructor(private _route: ActivatedRoute,
              private _service: EcnService,
              private _chartService: GoogleChartsService) { }


  private setEcnData(ecns: Iecn[]) {

    this.statusData = this.statusPipe.transform(ecns.filter(e=>!e.isTask), new Date(), moment(new Date()).subtract(7,"days").toDate());
   
    if (this.statusData != null && this.statusData.length>0 ){
    this.sumCurrValue = this.statusData.map(sd=>sd.currValue).reduce((a,b)=>a+b)
    this.sumPastValue = this.statusData.map(sd=>sd.pastValue).reduce((a,b)=>a+b)
    }

    //Convert to arrary or arrays
    this.data = this.statusData.map(s=> [s.Key, s.pastValue, s.currValue])
   
       if (this.data != null && this.data.length > 0)
          {
            
          //Prepend header row to the array
          this.data.unshift(["Status", "Past Week", "Current Week"])

          //Define Options for the chart
          this.config = new BarChartConfig("", { format: "decimal" }, {groupWidth: "50%"}, { position: "top" })

          //Create the chart
          this._chartService.buildColumnChart(this.elementId, this.data, this.config);
        }
        else
        {
          document.getElementById(this.elementId).innerHTML = ``;
        }


      }


  ngOnInit() {

        this.elementId = "barChart"

    this._route.paramMap.switchMap((params: ParamMap)=> {
      this.pId = +params.get('pId');
      this.uId = +params.get ('uId');

      return this._service.getEcns(this.uId, this.pId);

    })
    .subscribe( (ecns: Iecn[])=>{
      this.ecnData = ecns.filter(e=> !e.isTask && ((e.statusId==1)||(e.statusId==2))).map(e=> 
        { //Get latest Comment from the ECN
          this.latestComment = e.comments.sort(
                                              (a,b)=>{if (a.date>b.date) {return -1} 
                                                else if(a.date<b.date){return 1}
                                                else return 0
                                                })[0];
        //Return mapped structure
        return {
        ecnNo: e.ecnNo, 
        title: e.title,
        status: e.status,
        
        //Create a string of date and comment
        lastComment: (this.latestComment !=null)? moment(this.latestComment.date).format("ll") + ": " + this.latestComment.value: null
      }});

      this.ecnDataCCB = ecns.filter(e=> !e.isTask && ((e.statusId==7))).map(e=> {return {
        ecnNo: e.ecnNo, 
        title: e.title,
        status: e.status,
        lastComment: (e.comments.length>0)? moment(e.comments[0].date).format("ll") + ": " + e.comments[0].value: null
      }});

      this.setEcnData(ecns);
      
    })
  }


}
