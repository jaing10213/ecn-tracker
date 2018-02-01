import { Pipe, PipeTransform } from '@angular/core';
import {Iecn} from '../Objects/Iecn';

@Pipe({
  name: 'ecnTask'
})
export class EcnTaskPipe implements PipeTransform {

  transform(value: Iecn[], args?: boolean): Iecn[] {

  return (value == null || args == null)? value:  value.filter(e => e.isTask==args);
  }

}
