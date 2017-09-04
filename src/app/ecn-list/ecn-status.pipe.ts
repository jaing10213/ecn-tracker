import { Pipe, PipeTransform } from '@angular/core';
import {Iecn} from '../Objects/Iecn';

@Pipe({
  name: 'ecnStatus'
})
export class EcnStatusPipe implements PipeTransform {

   transform(value: Iecn[], statusValues?: {value:string, checked:boolean}[]): Iecn[] {
    return (!value || !statusValues ||  statusValues.length===0) ? value : value.filter(
      ecn => statusValues.map(a=>a.value).includes(ecn.status) )
  }

}
