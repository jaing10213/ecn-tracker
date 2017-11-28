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

  @Input() comments: Icomment[];
  @Input() editItem: number = -1;

  @Output() notifyDelete: EventEmitter<null> = new EventEmitter<null>();

blnCommentSaved: boolean = false;
blnCommentDeleted: boolean = false;
blnCommentSaving: boolean = false;
 

  deleteComment(id: number): void {
    this.blnCommentSaving = true;
    this._commentService.deleteComment(id)
      .subscribe(
      (msg) => this.onDelete(id),
      (error) => {}
      );
  }

  saveComment(id: number): void {
    this.blnCommentSaved = false;
    this.blnCommentSaving = true;
     this._commentService.saveComment(this.comments.find(c => c.id == id))
      .subscribe(
      (msg) => this.onSaveComment(id),
      (error)=> this.onError(error)
      )
  }

  onDelete(id: number): void {
   
      let i = this.comments.findIndex(c => c.id == id);
      
      this.comments.splice(i, 1);
     // this.comments = this.comments;

      this.blnCommentSaving = false;
      this.blnCommentDeleted = true;
      setTimeout(()=>{this.blnCommentDeleted=false},1500);
      
      this.notifyDelete.emit(); //call back the main ecn list to delete the comment
      
    
  }

  onSaveComment(id: number): void {
   
       this.editItem = -1;
       this.blnCommentSaving = false;
       this.blnCommentSaved = true;
      setTimeout(()=>{this.blnCommentSaved=false},1500);
    
  }

  onError(error:any): void{
    this.blnCommentSaving = false;
  }

  ngOnInit() {

  }

}
