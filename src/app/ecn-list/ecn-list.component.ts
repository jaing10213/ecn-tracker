import { Component, OnInit } from '@angular/core';

import { Iecn } from '../Objects/Iecn';
import {Icomment} from '../Objects/Icomment';
import {EcnService} from '../Services/ecn-list.service';

@Component({
 // selector: 'app-ecn-list',   
  templateUrl: './ecn-list.component.html',
  styleUrls: ['./ecn-list.component.css']
})
export class EcnListComponent implements OnInit {

  title = 'ECN Tracker';
  ecns: Iecn[] ;
  currComment: Icomment[];
  //sort order
  sortAsc: boolean = true;
  commentInpType: boolean = true;

   res: number = 0;

  //injecting the service in the constructor
  constructor(private _ecnSerive: EcnService) { }

  addComment(i): void{
    //console.log(i);
  this.ecns[i].comments =  this.ecns[i].comments.concat([{date: new Date('2017-11-16T00:00:00'), comment: 'Created new comment'}]);
 
 }

 setCurrentComment(i): void{
   
   this.currComment =  this.ecns[i].comments;
   this.commentInpType = true;
  

 }


  detailsView(i): void {
    //console.log(event);
   this.title = this.ecns[i].ecnNo;
  }

  sortColumn(colName: string): void {
    
      
   this.ecns= this.ecns.sort((n1,n2) => { 
     switch(colName)
     {
       case 'ecnNo':
       this.res =  this.colSort(n1.ecnNo.toLowerCase(), n2.ecnNo.toLowerCase());
       break;
       
       case 'status':
        this.res =  this.colSort(n1.status.toLowerCase(), n2.status.toLowerCase());
        break;

       case 'priority':
        this.res =  this.colSort(+n1.priority, +n2.priority);
         break;

       case 'resource':
        this.res =  this.colSort(n1.resource.toLowerCase(), n2.resource.toLowerCase());
         break;

       default:
        this.res =  0

        
     }
     if(this.sortAsc)     {
       
       return this.res;
     }
     else{
       return -this.res;
     }
   


}); 

this.sortAsc = !this.sortAsc;
  }

  colSort(n1, n2): number {



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
     // console.log(i)
      this.ecns.splice(i,1);
    }
   
    
  }

  ngOnInit() {
    //populate the ecn list here from the service
    this.ecns = this._ecnSerive.getEcns();
    this.currComment = this.ecns[1].comments;
    
  }

}
