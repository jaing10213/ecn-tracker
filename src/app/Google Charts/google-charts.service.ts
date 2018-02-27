import { Injectable } from '@angular/core';
import {GoogleChartsBaseService} from './google-charts-base.service'
import {BarChartConfig} from './Configs/BarChartConfig'

declare var google:any

@Injectable()
export class GoogleChartsService extends GoogleChartsBaseService {

  constructor() {  super()}

   public BuildBarChart(elementId: string, data: any[], options: BarChartConfig) : void {  
    var chartFunc = () => { return new google.visualization.BarChart(document.getElementById(elementId)); };
    // var options = {
    //         title: config.title,
    //         pieHole: config.pieHole,
    //   };

    this.buildChart(data, chartFunc, options);

}

  public buildColumnChart(elementId: string, data: any[], options: BarChartConfig): void{
    var chartFunc = () => {return new google.visualization.ColumnChart(document.getElementById(elementId));};
    this.buildChart(data, chartFunc, options);
  }

  public buildTimelineChart(elementId: string, data: any[], options: any): void {
    var chartFunc = ()=> {return new google.visualization.Timeline(document.getElementById(elementId));}
    this.buildChart(data,chartFunc,options);
  }


}
