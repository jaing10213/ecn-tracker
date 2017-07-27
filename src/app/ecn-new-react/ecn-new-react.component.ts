import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators, ValidatorFn } from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

  function priorityRange(c: AbstractControl ): {[key:string]: boolean} | null {

    if(c.value != undefined && (isNaN(c.value) || c.value < 1 || c.value > 10) ){
      
      return {'range':true};
    };

      return null;
  }

  function PriorityRangeWithParameters (min:number, max:number) : ValidatorFn {
    return (c: AbstractControl):{[Key: string]: boolean} | null => {
      if ((c.valid !=undefined) && (isNaN(c.value)|| c.value < min || c.value> max))
      {
        
        return {'range': true};
      }
      else
      {
        return null;
      }
    }

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

  ecnErrorMessage: string ;
  isEcnValid: boolean =false;

  private ecnValidationMessages={
    minlength: 'ECN No. should be a min. of 6 characters',
    required: 'ECN No. is required',
    pattern: 'ECN No. should be alpha-numeric'
  }

  private setEcnErrorMessage(c: AbstractControl): void {

      this.ecnErrorMessage = '';
      
      if ((c.dirty || c.touched ) && c.errors){
        this.ecnErrorMessage = Object.keys(c.errors).map(
          key=> this.ecnValidationMessages[key]).join('; ');          
      }

    this.isEcnValid=false;

    if(c.dirty && c.valid )
    {
      this.isEcnValid = true;
    }

  }


priorityErrorMessage: string;
isPriorityValid: boolean = false;

private priorityValidationMessages ={
  'range': 'Priority should be within 0 an 1',
}

private setPriorityErrorMessages(c: AbstractControl){

  this.priorityErrorMessage = '';

if (c.errors != null)
{

}
  if((c.dirty || c.touched) && c.errors){
   
    this.priorityErrorMessage = Object.keys(c.errors).map( key=>
      this.priorityValidationMessages[key]).join('; ');

    }
        this.isPriorityValid = false;
    if (c.dirty && c.valid) {
      this.isPriorityValid = true;
  }


};


  //inject the form builder service in the constructor
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



    this.newEcnForm = this.fb.group({
      ecnNo: ['',[Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]+')]],
      status: [{value: '', disabled: false}, [Validators.required, Validators.minLength(3)]],
      resource: ['',[Validators.required, Validators.minLength(2)]],
      tags: '',
      description: '',
      priority: [1,PriorityRangeWithParameters(1,10)]
    })

   const ecnFromControl = this.newEcnForm.get('ecnNo');
   ecnFromControl.valueChanges.debounceTime(1000).subscribe((value)=>
          this.setEcnErrorMessage(ecnFromControl) 
         );

         const priorityFormControl = this.newEcnForm.get('priority');
         priorityFormControl.valueChanges.debounceTime(1000).subscribe(value=>
          this.setPriorityErrorMessages(priorityFormControl)
         );

   // this.newEcnForm.valueChanges.subscribe(value=> console.log(JSON.stringify(value)));

    //initialize form control properties (don't need this. instead use FormBuilder)

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
  }

}
