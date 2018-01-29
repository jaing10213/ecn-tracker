import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayTotal'
})
export class ArrayTotalPipe implements PipeTransform {

  transform(value: any[], prop: string): number {
    //Need to check for length of array "value" as it is required if the array is empty
   return (!value || value.length <1 || !prop)?0:value.map(v=>v[prop]).reduce((a,b)=>a+b);
  }

}
