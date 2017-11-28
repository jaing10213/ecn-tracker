import { Component, OnInit, ViewChild } from '@angular/core';

import { Iecn } from '../Objects/Iecn';
import { Icomment } from '../Objects/Icomment';
import { EcnService } from '../Services/ecnService';
import * as moment from 'moment';

@Component({
  // selector: 'app-ecn-list',   
  templateUrl: './ecn-list.component.html',
  styleUrls: ['./ecn-list.component.css']
})
export class EcnListComponent implements OnInit {

  title = 'ECN Tracker';
  errorMessage: string;
  ecns: Iecn[];

  statusList: { value: string, checked: boolean }[];
  resourceList: { value: string, checked: boolean }[];
  priorityList: { value: number, checked: boolean }[];
  projectList: { value: string, checked: boolean }[];
  tagsList: { value: string, checked: boolean }[];

  selectedResources: string[] = [];
  selectedStatus: string[] = [];

  selRes: string;

  ecnsLoaded: boolean = false;

  currComment: Icomment[];
  //sort order
  sortAsc: boolean = true;

  currEcnId: number;
  blnError: boolean = false;
  nComments: number = 2;  //Number of comments to be displayed
  serText: string = "";

  editComment: number = -1;

  res: number = 0;

  //injecting the service in the constructor
  constructor(private _ecnSerive: EcnService) { }


  newCommentCreated(comment: Icomment): void {
    //Add the newly added comment to the ECN
    let ecn = this.ecns.find(e => e.id == comment.ecnId);
    let comments = ecn.comments;
    ecn.comments = comments.concat(comment); //Use concat method as this will trigger the pipes. Push method won't
  }

  commentDeleted(): void {
    this.nComments = (this.nComments == 2) ? 2.1 : 2;  //a really dirty way to trigger the arrayLimiter pipe (by changing its input)

  }

  setCurrentComment(id: number): void {
    this.editComment = -1;
    this.currComment = this.ecns.find(e => e.id == id).comments;
    this.currEcnId = id;

  }

  sortColumn(colName: string): void {

    this.ecns = this.ecns.sort((n1, n2) => {
      switch (colName) {
        case 'ecnNo':
          this.res = this.colSort(n1.ecnNo.toLowerCase(), n2.ecnNo.toLowerCase());
          break;

        case 'status':
          this.res = this.colSort(n1.status.toLowerCase(), n2.status.toLowerCase());
          break;

        case 'priority':
          this.res = this.colSort(+n1.priority, +n2.priority);
          break;

        case 'resource':
          this.res = this.colSort(n1.currentWorkerName.toLowerCase(), n2.currentWorkerName.toLowerCase());
          break;

        default:
          this.res = 0


      }
      if (this.sortAsc) {

        return this.res;
      }
      else {
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

  setDeleteEcn(id: number): void {
    this.currEcnId = id;

  }

  deleteEcn(): void {

    this._ecnSerive.deleteEcn(this.currEcnId)
      .subscribe(msg => this.onDeleteEcn(this.currEcnId),
      error => this.errorMessage = <any>error)
  }

  onDeleteEcn(id: number): void {
   
      this.ecns = this.ecns.filter(e => e.id != id);
   
  }

  filterOnStatus(): { value: string, checked: boolean }[] {
    return this.statusList.filter(item => item.checked);
  }

  filterOnProject(): {value:string, checked: boolean}[]{
    return this.projectList.filter(item=>item.checked);
  }

  filterOnTags(): { value: string, checked: boolean }[] {
    return this.tagsList.filter(item => item.checked);
  }

  filterOnResources(): { value: string, checked: boolean }[] {
    return this.resourceList.filter(item => item.checked);
  }

  filterOnPriority(): { value: number, checked: boolean }[] {
    return this.priorityList.filter(item => item.checked);
  }

  calcDays(date: Date): string {
    if (!date) return "";

    var res = moment(Date.now()).diff(moment(date));
    return moment.duration(res).humanize();
  }

  private getEcns() {
    this.blnError = false;
    //Create list of filters (status, resource, priority, tags) when ecns arrive back from database
    this._ecnSerive.getEcns().subscribe((ecn) => {
     
        this.ecns = ecn //assign to component ecn array
        this.statusList = ecn.map(e => { return { value: e.status, checked: false } }).filter((x, i, a) => a.map(z => z.value).indexOf(x.value) === i);
        this.resourceList = ecn.map(e => { return { value: e.currentWorkerName, checked: false } }).filter((x, i, a) => a.map(z => z.value).indexOf(x.value) === i);
        this.priorityList = ecn.map(e => { return { value: e.priority, checked: false } }).filter((x, i, a) => a.map(z => z.value).indexOf(x.value) === i);
        this.projectList = ecn.map(e => { return { value: e.projectName, checked: false } }).filter((x, i, a) => a.map(z => z.value).indexOf(x.value) === i);
        this.tagsList = ecn.filter(e => e.tags).map(e => { return { value: e.tags, checked: false } })
          .filter((x, i, a) => a.map(z => z.value).indexOf(x.value) === i);
       // console.log("projects: " + JSON.stringify(this.projectList));
        this.ecnsLoaded = true;
      
    },
      error => {this.errorMessage = <any>error;  this.blnError = true;});
  }

  ngOnInit() {
    //populate the ecn list here from the service
    this.getEcns();
  }

}
