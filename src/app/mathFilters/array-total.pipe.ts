import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayTotal'
})
export class ArrayTotalPipe implements PipeTransform {

  transform(value: any[], prop: string): number {
   return (!value || !prop)?0:value.map(v=>v[prop]).reduce((a,b)=>a+b);
  }

}
