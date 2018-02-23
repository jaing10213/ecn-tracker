import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/switchMap'
import * as moment from 'moment'

import {EcnService} from '../Services/ecnService'
import {Iecn} from '../Objects/Iecn'
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
  statusData: any[];
  ecnData: any;
  
  config: BarChartConfig;
  elementId: string;
  data: any[];


  statusPipe: StatusCountPipe = new StatusCountPipe();

  constructor(private _route: ActivatedRoute,
              private _service: EcnService,
              private _chartService: GoogleChartsService) { }


  private setEcnData(ecns: Iecn[]) {

    this.statusData = this.statusPipe.transform(ecns.filter(e=>!e.isTask), new Date(), moment(new Date()).subtract(7,"days").toDate());
 
    //Convert to arrary or arrays
    this.data = this.statusData.map(s=> [s.Key, s.currValue, s.pastValue])
   
       if (this.data != null && this.data.length > 0)
          {
            
          //Prepend header row to the array
          this.data.unshift(["Status", "Current Week", "Past Week"])

          //Define Options for the chart
          this.config = new BarChartConfig("", {groupWidth: "50%"}, { position: "top" })

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
      this.ecnData = ecns.filter(e=> !e.isTask && ((e.statusId==1)||(e.statusId==2)||(e.statusId==4))).map(e=> {return {
        ecnNo: e.ecnNo, 
        title: e.title,
        status: e.status,
        lastComment: (e.comments.length>0)? moment(e.comments[0].date).format("ll") + ": " + e.comments[0].value: null
      }});
      this.setEcnData(ecns);
      
    })
  }


}
