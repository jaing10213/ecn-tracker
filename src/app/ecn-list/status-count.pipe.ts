import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import {Iecn} from '../Objects/Iecn'
import {IstatusHistory} from '../Objects/IstatusHistory'

@Pipe({
  name: 'statusCount'
})
export class StatusCountPipe implements PipeTransform {

  transform(ecns: Iecn[], currDate: any, prevDate: any): {Key:string, currValue:number, pastValue: number}[] {
      if (ecns == null || currDate == null || prevDate == null) return null;

    //  console.log(currDate + " : " + prevDate)

      //  ecns.map(e=>e.statusHistory).forEach(sh=>sh.forEach(s=>console.log(moment(s.statusDate)))
        var statusCurrWeek =  this.summarizeStatus(ecns,currDate); //Get array of current week's status
        var statusPastWeek =  this.summarizeStatus(ecns, prevDate); //Get array of past week's status

//console.log(JSON.stringify(statusCurrWeek))
//console.log(JSON.stringify(statusPastWeek))


          //Next block is to calculate the sum of each status
      let  sumRes: {Key:string, currValue: number, pastValue: number}[] = [];   //create an array that will store the status (Key) and count (Value)

       // Summarize current week status
        statusCurrWeek.forEach(elem=>{
            if (sumRes.map(sr=>sr.Key.toLowerCase()).indexOf(elem.toLowerCase())>=0){   //if the elem of statusCurrWeek is present in the sumRes array then increase the count by 1
              sumRes.find(sr=>sr.Key.toLowerCase()==elem.toLowerCase()).currValue++;
            }
            else{ //else. add the status to the sumRes array
              sumRes.push({Key: elem, currValue: 1, pastValue: 0});
            }
        });

        //Summarize Past week Status
         statusPastWeek.forEach(elem=>{
            if (sumRes.map(sr=>sr.Key.toLowerCase()).indexOf(elem.toLowerCase())>=0){   //if the elem of statusPastWeek is present in the sumRes array then increase the count by 1
              sumRes.find(sr=>sr.Key.toLowerCase()==elem.toLowerCase()).pastValue++;
            }
            else{ //else. add the status to the sumRes array
              sumRes.push({Key: elem, currValue: 0, pastValue: 1});
            }
        });
        return sumRes;
  }

  //Sort function in decending order
  private sortDesc(d1: IstatusHistory,d2: IstatusHistory): number {
          let  res: number
             if (moment(d1.statusDate).diff(moment(d2.statusDate)) < 0) res= -1;   
            if (moment(d1.statusDate).diff(moment(d2.statusDate)) > 0) res= 1;
            else res= 0;
         //   console.log(d1.status + " : " + res)

            return res
  }

  private summarizeStatus(ecns: Iecn[], date: Date): string[] {
      return ecns.map(e=> e.statusHistory
          .filter(sh=> 
          {
          //  console.log(sh.status + " : " + moment(sh.statusDate) + " : " + (moment(date)) + " : " +  moment(sh.statusDate).diff((moment(date))) )
            return moment(sh.statusDate).diff((moment(date))) <= 0
          }) //only keep items that are on or before the input "date"
          .sort((d1,d2)=>this.sortDesc(d1,d2))          //sort in descending order based on status date
          .shift())                                     //take the first item (latest status)
          .filter(sh=>sh!=null)                         //filter out items that are null 
          .map(sh=>sh.status) 
  }

}
