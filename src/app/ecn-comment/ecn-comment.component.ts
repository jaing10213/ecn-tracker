import { Component, OnInit, Input } from '@angular/core';
import {Icomment} from '../Objects/Icomment';

@Component({
  selector: 'ecn-comment',
  templateUrl: './ecn-comment.component.html',
  styleUrls: ['./ecn-comment.component.css']
})
export class EcnCommentComponent implements OnInit {

  constructor() { }

 @Input() comments: Icomment[];

  addComment(i): void{
    //console.log(i);
  this.comments=   this.comments.concat([{date: new Date('2017-11-16T00:00:00'), comment: 'Created new comment'}]);
 
 }

  ngOnInit() {

  }

}
