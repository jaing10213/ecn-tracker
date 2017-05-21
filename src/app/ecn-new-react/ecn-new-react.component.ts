import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'ecn-new-react',
  templateUrl: './ecn-new-react.component.html',
  styleUrls: ['./ecn-new-react.component.css']
})
export class EcnNewReactComponent implements OnInit {

  newEcnForm: FormGroup;  //property for root form FormGroup

  //properties for form controls
  /*
  ecnNo: FormControl;
  description: FormControl;
  status: FormControl;
  priority: FormControl;
*/

  constructor(private fb: FormBuilder) { }

  saveForm(): void {
    console.log(this.newEcnForm.value);
  }

  testValue(): void {
    this.newEcnForm.patchValue(
      {
        ecnNo: 'E12345',
        priority: 3,

      }
    )
  }

  ngOnInit() {

    //initialize form control properties

    /*
    this.ecnNo = new FormControl();
    this.description = new FormControl();
    this.status = new FormControl();
    this.priority = new FormControl(1);

    //initialize root form group by passing form controls
   
    this.newEcnForm = new FormGroup({
      ecnNo: this.ecnNo,
      description: this.description,
      status: this.status,
      priority: this.priority
    })
    */

    this.newEcnForm = this.fb.group({
      ecnNo: '',
      status: {value: 'CCB', disabled: true},
      description: '',
      priority: 5
    })
  }

}
