import {IChartConfig} from './IChartConfig'

export class BarChartConfig implements IChartConfig  {
        title: string
        bar: any
        legend: any

     
        constructor(title: string, 
                    bar: any, legend: any) {
            this.title = title;
            this.bar = bar;
            this.legend = legend;
        }
}