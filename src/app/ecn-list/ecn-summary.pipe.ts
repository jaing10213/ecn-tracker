import { Pipe, PipeTransform } from '@angular/core';
import { Iecn } from '../Objects/Iecn';

@Pipe({
  name: 'ecnSummary'
})
export class EcnSummaryPipe implements PipeTransform {

  transform(ecns: Iecn[], attr?: string): { prop: string, count: number }[] {

    return (!ecns || !attr) ? [] : this.sumamrize(ecns, attr);
  }

  private sumamrize(ecns: Iecn[], attr: string): { prop: string, count: number }[] {

    //initialize the return array
    let res: { prop: string, count: number }[] = [];

          ecns.forEach(item => {
            //if status or user already exists in the res array then increment the count
            if (res.map(r => r.prop).includes(item[attr])) {
              res.find(elem => elem.prop == item[attr]).count++;
            }
            else {
              //add the status or user to the res array
              res.push({ prop: item[attr], count: 1 });
            }
          });
    

    return res;
  }

}
