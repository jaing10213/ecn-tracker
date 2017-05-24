import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators, ValidatorFn } from '@angular/forms';

  function priorityRange(c: AbstractControl ): {[key:string]: boolean} | null {

    if(c.value != undefined && (isNaN(c.value) || c.value < 1 || c.value > 10) ){
      console.log (c.value);
      return {'range':true};
    };

      return null;
  }

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
      ecnNo: ['',[Validators.required, Validators.minLength(6)]],
      status: [{value: '', disabled: false}, [Validators.required, Validators.minLength(3)]],
      description: '',
      priority: [1,[priorityRange]]
    })
  }

}
