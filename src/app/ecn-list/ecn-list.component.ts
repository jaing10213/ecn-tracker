import { Component, OnInit } from '@angular/core';

import { Iecn } from '../ecn/Iecn';
import {EcnService} from '../Services/ecn-list.service';

@Component({
 // selector: 'app-ecn-list',   
  templateUrl: './ecn-list.component.html',
  styleUrls: ['./ecn-list.component.css']
})
export class EcnListComponent implements OnInit {

  title = 'ECN Tracker';
  ecns: Iecn[] ;

  //injecting the service in the constructor
  constructor(private _ecnSerive: EcnService) { }

  detailsView(i): void {
    //console.log(event);
   this.title = this.ecns[i].ecnNo;
  }

  sortColumn(colName): void {
    
   this.ecns= this.ecns.sort((n1,n2) => {
     switch(colName)
     {
       case 'ecnNo':
       return this.colSort(n1.ecnNo.toLowerCase(), n2.ecnNo.toLowerCase());
       
       case 'status':
       return this.colSort(n1.status.toLowerCase(), n2.status.toLowerCase());

       case 'resource':
       return this.colSort(n1.resource.toLowerCase(), n2.resource.toLowerCase());

       default:
       return 0
     }
//return this.colSort(n1.ecnNo, n2.ecnNo);

}); 
  }

  colSort(n1: string, n2: string): number {

    if (n1 > n2) {
        return 1;
    }

    if (n1 < n2) {
        return -1;
    }

    return 0;

  } 

  deleteEcn(i): void {
    //console.log(i);
    if(i>-1){
      this.ecns.splice(i,1);
    }
   
    
  }

  ngOnInit() {
    //populate the ecn list here from the service
    this.ecns = this._ecnSerive.getEcns();
    
  }

}
