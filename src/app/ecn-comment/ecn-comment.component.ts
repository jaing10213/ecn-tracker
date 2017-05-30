import { Component, OnInit, Input } from '@angular/core';
import {Icomment} from '../Objects/Icomment';

@Component({
  selector: 'ecn-comment',
  templateUrl: './ecn-comment.component.html',
  styleUrls: ['./ecn-comment.component.css']
})
export class EcnCommentComponent implements OnInit {

  constructor() { }

 @Input() inpType: boolean = true;

 @Input() comments: Icomment[];


changeInputType(): void{
  this.inpType = !this.inpType;
}

  ngOnInit() {

  }

}
