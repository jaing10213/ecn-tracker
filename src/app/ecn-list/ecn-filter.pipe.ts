import { Pipe, PipeTransform } from '@angular/core';
import { Iecn } from '../Objects/Iecn'

@Pipe({
  name: 'ecnFilter'
})
export class EcnFilterPipe implements PipeTransform {

  transform(value: Iecn[], param1: string): Iecn[] {



    return (value == null) ? value : value.filter(
      ecn => (
        ((!ecn.status) ? false : ecn.status.toLowerCase().indexOf(param1.toLowerCase()) >= 0)
        || ((!ecn.ecnNo) ? false : ecn.ecnNo.toLowerCase().indexOf(param1.toLowerCase()) >= 0)
        || ((!ecn.title) ? false : ecn.title.toLowerCase().indexOf(param1.toLowerCase()) >= 0)
        || ((!ecn.currentWorkerName) ? false : ecn.currentWorkerName.toLowerCase().indexOf(param1.toLowerCase()) >= 0)
        || ((!ecn.description) ? false : ecn.description.toLowerCase().indexOf(param1.toLowerCase()) >= 0)
        || ((!ecn.comments) ? false : ecn.comments.some(a => a.value.toLowerCase().indexOf(param1.toLowerCase()) >= 0))
        || ((!ecn.tags) ? false : ecn.tags.toLowerCase().indexOf(param1.toLowerCase()) >= 0)
      ));

  }
}
