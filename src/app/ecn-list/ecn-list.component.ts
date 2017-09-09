import { Component, OnInit } from '@angular/core';

import { Iecn } from '../Objects/Iecn';
import {Icomment} from '../Objects/Icomment';
import {EcnService} from '../Services/ecnService';

@Component({
 // selector: 'app-ecn-list',   
  templateUrl: './ecn-list.component.html',
  styleUrls: ['./ecn-list.component.css']
})
export class EcnListComponent implements OnInit {

  title = 'ECN Tracker';
  errorMessage: string;
  ecns: Iecn[] ;

  statusList: {value: string, checked: boolean}[];
  resourceList: {value: string, checked: boolean}[];
  priorityList: {value: number, checked:boolean}[];

  selectedResources: string[] = [];
  selectedStatus: string[] = [];

  selRes: string;

  currComment: Icomment[];
  //sort order
  sortAsc: boolean = true;
  commentInpType: boolean = true;
  currEcnId: number;
  blnError: boolean = false;

  serText: string ="";

   res: number = 0;

  //injecting the service in the constructor
  constructor(private _ecnSerive: EcnService) { }


newCommentCreated(comment: Icomment):void{
  //Add the newly added comment to the ECN
  let ecn = this.ecns.find(e=>e.id == comment.ecnId);
  let comments =ecn.comments;
  ecn.comments =  comments.concat(comment); //Use concat method as this will trigger the pipes. Push method won't
}


 setCurrentComment(i): void{
   this.currComment =  this.ecns[i].comments;
   this.commentInpType = true;
    this.currEcnId = this.ecns[i].id;

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
        this.res =  this.colSort(n1.currentWorkerName.toLowerCase(), n2.currentWorkerName.toLowerCase());
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

  filterOnStatus(): {value:string, checked:boolean}[]{
   return this.statusList.filter(item=>item.checked);

  }

  filterOnResources(): {value:string, checked:boolean}[] {
   return this.resourceList.filter(item=>item.checked);
  }

  filterOnPriority(): {value:number, checked:boolean}[]{
    return this.priorityList.filter(item=>item.checked);
  }

private getEcns()
{
  this.blnError = false;
  this._ecnSerive.getEcns().subscribe(({ecn,ok})=> {
                                      if(ok){
                                      this.ecns = ecn
                                      this.statusList =ecn.map(e=>{return {value:e.status,checked:false}}).filter((x, i, a) => a.map(z=>z.value).indexOf(x.value) ===i);
                                      this.resourceList = ecn.map(e=>{return {value:e.currentWorkerName,checked:false}}).filter((x, i, a) => a.map(z=>z.value).indexOf(x.value) ===i);
                                      this.priorityList = ecn.map(e=>{return {value:e.priority,checked:false}}).filter((x, i, a) => a.map(z=>z.value).indexOf(x.value) === i)
                                    }
                                    else{this.blnError = true}}
                                    ,
                                      error=> this.errorMessage=<any>error);
}

  ngOnInit() {
    //populate the ecn list here from the service
   this.getEcns();
  }

}
