import { Injectable } from '@angular/core';

declare var google: any

@Injectable()
export class GoogleChartsBaseService {

  constructor() {
    google.charts.load('current', {'packages': ['corechart', 'timeline']});
   }
   
  protected buildChart(data: any[], chartFunc: any, options: any) : void {
    var func = (chartFunc, options) => {
      var datatable = google.visualization.arrayToDataTable(data);
     // console.log(JSON.stringify( datatable))
     // options = {};
      chartFunc().draw(datatable, options);
    };   
    var callback = () => func(chartFunc, options);
    google.charts.setOnLoadCallback(callback);
  }

}
