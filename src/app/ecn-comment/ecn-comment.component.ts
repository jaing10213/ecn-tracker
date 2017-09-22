import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Icomment } from '../Objects/Icomment';
import { CommentService } from '../Services/commentService'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'ecn-comment',
  templateUrl: './ecn-comment.component.html',
  styleUrls: ['./ecn-comment.component.css']
})
export class EcnCommentComponent implements OnInit {

  constructor(private _commentService: CommentService) { }

  @Input() inpType: boolean = true;

  @Input() comments: Icomment[];

  @Output() notifyDelete: EventEmitter<null> = new EventEmitter<null>();

commentSaved: boolean = false;
commentDeleted: boolean = false;

  changeInputType(): void {
    this.inpType = !this.inpType;
  }

  deleteComment(id: number): void {
    this._commentService.deleteComment(id)
      .subscribe(
      (ok) => this.onDelete(ok, id)
      );
  }

  saveComment(id: number): void {
    this.commentSaved = false;
    this._commentService.saveComment(this.comments.find(c => c.id == id))
      .subscribe(
      ({comment, ok}) => this.onSaveComment(ok, id)
      )
  }

  onDelete(ok: boolean, id: number): void {
    if (ok) {
      let i = this.comments.findIndex(c => c.id == id);
      
      this.comments.splice(i, 1);
     // this.comments = this.comments;

      this.commentDeleted = true;
      setTimeout(()=>{this.commentDeleted=false},1500);
      
      this.notifyDelete.emit(); //call back the main ecn list to delete the comment
      
    }
  }

  onSaveComment(ok: boolean, id: number): void {
    if (ok) {
      this.commentSaved = true;
      setTimeout(()=>{this.commentSaved=false},1500);
    }
  }

  ngOnInit() {

  }

}
