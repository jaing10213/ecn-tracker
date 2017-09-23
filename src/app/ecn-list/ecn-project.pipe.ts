import { Pipe, PipeTransform } from '@angular/core';
import {Iecn} from '../Objects/Iecn';

@Pipe({
  name: 'ecnProject'
})
export class EcnProjectPipe implements PipeTransform {

  transform(value: Iecn[], projectValues?: {value: string, checked: boolean}[]): Iecn[] {
   return (!value || ! projectValues || projectValues.length==0)? value: value.filter(
     ecn=> projectValues.map(p=>p.value).includes(ecn.projectId.toString())
   )
  }

}
