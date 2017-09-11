import { Pipe, PipeTransform } from '@angular/core';
import {Iecn} from '../Objects/Iecn';

@Pipe({
  name: 'ecnTags'
})
export class EcnTagsPipe implements PipeTransform {

  transform(value: Iecn[], tagValues?: {value:string, checked:boolean}[]): Iecn[] {
    return (!value || !tagValues || tagValues.length==0)? value: value.filter(
      ecn=>tagValues.map(t=>t.value).includes(ecn.tags)
    )
  }

}
