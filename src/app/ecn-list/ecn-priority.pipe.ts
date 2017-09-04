        import { Pipe, PipeTransform } from '@angular/core';
        import {Iecn} from '../Objects/Iecn'

@Pipe({
  name: 'ecnPriority'
})
export class EcnPriorityPipe implements PipeTransform {



  transform(value: Iecn[], priorityValues?: {value:number, checked:boolean}[]): Iecn[] {
  

   return (!value || !priorityValues || priorityValues.length === 0)?value: value.filter(
      ecn=>priorityValues.map(z=>z.value).includes(ecn.priority))
  }

}
