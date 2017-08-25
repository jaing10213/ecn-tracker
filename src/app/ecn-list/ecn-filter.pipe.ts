import { Pipe, PipeTransform } from '@angular/core';
import {Iecn} from '../Objects/Iecn'

@Pipe({
  name: 'ecnFilter'
})
export class EcnFilterPipe implements PipeTransform {

  transform(value: Iecn[], param1: string): Iecn[] {
   
   
    return (value==null)?value:value.filter( 
      ecn =>  (
                 ((ecn.status==null)?false:ecn.status.toLowerCase().indexOf(param1.toLowerCase())>=0)
              || ((ecn.ecnNo==null)?false:ecn.ecnNo.toLowerCase().indexOf(param1.toLowerCase())>=0)
              || ((ecn.resource==null)?false:ecn.resource.toLowerCase().indexOf(param1.toLowerCase())>=0)
              || ((ecn.description==null)?false:ecn.description.toLowerCase().indexOf(param1.toLowerCase())>=0)
              || ((ecn.comments==null)?false:ecn.comments.some(a=>a.value.toLowerCase().indexOf(param1.toLowerCase())>=0))
            ));
    
  }
}
