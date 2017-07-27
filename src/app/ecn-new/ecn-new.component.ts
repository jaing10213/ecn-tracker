import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Iecn} from '../Objects/Iecn'


@Component({
  selector: 'ecn-new',
  templateUrl: './ecn-new.component.html',
  styleUrls: ['./ecn-new.component.css']
})
export class EcnNewComponent implements OnInit {

  constructor() { }

  ecn: Iecn

  saveForm(ecnForm: NgForm){
    if (ecnForm.dirty){
      console.log(JSON.stringify(ecnForm.value));
      
    }
    
  }

  ngOnInit() {
    this.ecn =  {ecnNo: "", description: "", status: "", tags: "", priority: null , resource: "", comments: []};
  }

}
