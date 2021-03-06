import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'

import {CommentService} from '../Services/commentService';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {Icomment} from '../Objects/Icomment'

@Component({
  selector: 'new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  constructor(private fb: FormBuilder, 
              private _commentService: CommentService) { }

  newCommentForm: FormGroup;
  comment: Icomment;
  errorMsg: any;
  blnCommentAdded: boolean = false;
  blnCommentSaving: boolean = false;
 @Input() ecnId: number;

 @Output() notify: EventEmitter<Icomment> = new EventEmitter<Icomment>();


  saveComment():void{
      this.blnCommentAdded = false;
      this.blnCommentSaving = true;
       if ((this.newCommentForm.dirty) && (this.newCommentForm.valid)){
      //copy form values over the comment obejct values and return as a new Icomment object
      let c = Object.assign({}, this.comment, this.newCommentForm.value);
      
      //Assign ecnId
    //  console.log(this.ecnId);
      c.ecnId = this.ecnId;
      //Convert and assign date
      c.date = new Date(c.date);
      c.id = 0;

      //Call the comment service to save comment
      this._commentService.saveComment(c)
      .subscribe(
        (comment)=>this.onSaveComplete(comment as Icomment),
        (error)=> this.onError(error)
      );
 
  }
  }

 onSaveComplete(comment: Icomment): void{
  //Raise the event and pass the newly created comment to the parent
  
      this.notify.emit(comment);
      this.blnCommentSaving = false;
      this.blnCommentAdded = true;  
      setTimeout(()=> {this.blnCommentAdded=false;},1500) ;  
      this.newCommentForm.patchValue({
      value: ''
  })

}

  onError(error: any): void{
    this.errorMsg = <any>error;
    this.blnCommentSaving = false;
  }


  ngOnInit() {
    this.newCommentForm = this.fb.group({
      date: new Date().toLocaleDateString(),
      value: ['', Validators.required]
    })
   
  }

}
