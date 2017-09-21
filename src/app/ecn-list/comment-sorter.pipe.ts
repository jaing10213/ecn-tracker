import { Pipe, PipeTransform } from '@angular/core';
import {Icomment} from '../Objects/Icomment'

@Pipe({
  name: 'commentSorter'
})
export class CommentSorterPipe implements PipeTransform {

  transform(value: Icomment[]): any {
    return value.sort((c1,c2) =>{
        if (c1.date>c2.date) {return -1}
        if (c1.date<c2.date) {return 1}
        if (c1.date==c2.date) {if (c1.id > c2.id){return -1 } else {return 1}}
    })
  }

}
