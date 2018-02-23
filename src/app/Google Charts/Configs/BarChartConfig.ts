import {IChartConfig} from './IChartConfig'

export class BarChartConfig implements IChartConfig  {
        title: string
        vAxis: any
        bar: any
        legend: any

     
        constructor(title: string, 
                    vAxis: any,
                    bar: any, 
                    legend: any) {
            this.title = title;
            this.vAxis = vAxis;
            this.bar = bar;
            this.legend = legend;
        }
}