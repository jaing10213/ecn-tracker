import { Pipe, PipeTransform } from '@angular/core';
import {Iecn} from '../Objects/Iecn';

@Pipe({
  name: 'ecnResource'
})
export class EcnResourcePipe implements PipeTransform {

  transform(value: Iecn[], filterValues?: {value:string, checked:boolean}[]): Iecn[] {
    return (value == null || filterValues == null || !filterValues ||  filterValues.length===0) ? value : value.filter(
      ecn => filterValues.map(a=>a.value).includes(ecn.currentworkerName) )
  }
}

