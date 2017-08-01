import { Pipe, PipeTransform } from '@angular/core';
import {Icomment} from '../Objects/Icomment'

@Pipe({
  name: 'arrayLimiter'
})
export class ArrayLimiterPipe implements PipeTransform {

  transform(value: Icomment[], nElem: number):  Icomment[] {


    if( (value==null) || (value.length <= nElem ))
    {
      return value;
    }
    else
    {
      return value.slice(0, nElem) ;
    }

  }

}
