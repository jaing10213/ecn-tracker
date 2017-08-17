import { Component, OnInit, Input } from '@angular/core';
import {Icomment} from '../Objects/Icomment';
import {CommentService} from '../Services/commentService'
import {Observable} from 'rxjs/Observable'
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'ecn-comment',
  templateUrl: './ecn-comment.component.html',
  styleUrls: ['./ecn-comment.component.css']
})
export class EcnCommentComponent implements OnInit {

  constructor(private _commentService: CommentService) { }

 @Input() inpType: boolean = true;

 @Input() comments: Icomment[];


changeInputType(): void{
  this.inpType = !this.inpType;
}

 deleteEcn(i:number):void{
    this._commentService.deleteComment(this.comments[i].id)
    .subscribe(
      (ok)=>this.onDelete(ok,i)
    );
}

onDelete(ok: boolean, i:number): void{
  if(ok){
 this.comments.splice(i,1);
  }
}

  ngOnInit() {

  }

}
