import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms'

@Component({
  selector: 'new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  newCommentForm: FormGroup;

  ngOnInit() {
    this.newCommentForm = this.fb.group({
      date: new Date().toLocaleDateString(),
      comment: ''
    })
    console.log(this.newCommentForm.get('date').value);
  }

}
