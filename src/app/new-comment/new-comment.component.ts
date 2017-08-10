import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms'

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
 @Input() ecnId: number;


  saveComment():void{
    
       if ((this.newCommentForm.dirty) && (this.newCommentForm.valid)){
      //copy form values over the comment obejct values and return as a new Icomment object
      let c = Object.assign({}, this.comment, this.newCommentForm.value);
      c.ecnId = this.ecnId;
      console.log(JSON.stringify(c));
      this._commentService.saveComment(c)
      .subscribe(
        ()=>this.onSaveComplete(),
        (error: any)=> this.errorMsg = <any>error
      );
 
  }
  }

 onSaveComplete(): void{
  this.newCommentForm.reset();
}


  ngOnInit() {
    this.newCommentForm = this.fb.group({
      date: new Date().toLocaleDateString(),
      value: '',
      ecnId: ''
    })
   
  }

}
