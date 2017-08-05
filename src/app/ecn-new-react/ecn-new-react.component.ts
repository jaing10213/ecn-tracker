import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router'
import {EcnService} from '../Services/ecn-list.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {Iecn} from '../Objects/Iecn';

import 'rxjs/add/operator/debounceTime';


  function priorityRange(c: AbstractControl ): {[key:string]: boolean} | null {

    if(c.value != undefined && (isNaN(c.value) || c.value < 1 || c.value > 10) ){
      
      return {'range':true};
    };

      return null;
  }

//Set error messages for priorityRange using passed in min and max values
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


  //properties for form controls
  /*
  ecnNo: FormControl;
  description: FormControl;
  status: FormControl;
  priority: FormControl;
*/

  newEcnForm: FormGroup;  //property for root form FormGroup
  isEcnValid: boolean =false;
  sub: Subscription;
  errorMsg: string;
  ecn: Iecn;
  pageTitle: string;


constructor(private _fb: FormBuilder,
            private _ecnService: EcnService,
           private _route: ActivatedRoute,
           private _router: Router){
           }

  private ecnValidationMessages={
    minlength: 'ECN No. should be a min. of 7 characters',
    required: 'ECN No. is required',
    pattern: 'ECN No. should be alpha-numeric'
  }

  ecnErrorMessage: string[] ;
  private setEcnErrorMessage(c: AbstractControl): void {

      this.ecnErrorMessage = null;
      
      if ((c.dirty || c.touched ) && c.errors){
        this.ecnErrorMessage = Object.keys(c.errors).map(
          key=> this.ecnValidationMessages[key]);          
      }

    this.isEcnValid=false;

    if(c.dirty && c.valid )
    {
      this.isEcnValid = true;
    }

  }


priorityErrorMessage: string[];
isPriorityValid: boolean = false;

private priorityValidationMessages ={
  'range': 'Priority should be within 0 an 1',
}

private setPriorityErrorMessages(c: AbstractControl){

  this.priorityErrorMessage = null;

if (c.errors != null)
{

}
  if((c.dirty || c.touched) && c.errors){
   
    this.priorityErrorMessage = Object.keys(c.errors).map( key=>
      this.priorityValidationMessages[key]);

    }
        this.isPriorityValid = false;
    if (c.dirty && c.valid) {
      this.isPriorityValid = true;
  }


};

private getEcn(id: number){
  this._ecnService.getEcn(id).subscribe(
    (ecn: Iecn)=>this.onReceivingEcn(ecn),
    (error: any) => this.errorMsg = <any>error
  );
}

private onReceivingEcn(ecn: Iecn){
  //Reset form
  if (this.newEcnForm){
    this.newEcnForm.reset();
  }

  //Assign value to the Ecn property
  this.ecn = ecn;

//Deccide which page title to show (New vs. Edit)
if(this.ecn.id === 0){
  this.pageTitle = 'New ECN'
}
else
{
  this.pageTitle = ecn.ecnNo;
}

//Update data on the form

this.newEcnForm.patchValue(
  {
    ecnNo: this.ecn.ecnNo,
    status: this.ecn.status,
    resource: this.ecn.resource,
    priority: this.ecn.priority,
    description: this.ecn.description,
    tags: this.ecn.tags
    
  }
)


}

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


    this.newEcnForm = this._fb.group({
      ecnNo: ['',[Validators.required, Validators.minLength(7), Validators.pattern('[a-zA-Z0-9]+')]],
      status: [{value: '', disabled: false}, [Validators.required, Validators.minLength(3)]],
      resource: ['',[Validators.required, Validators.minLength(2)]],
      tags: '',
      description: '',
      priority: [1,PriorityRangeWithParameters(1,10)]
    })

    //Set error messages for EcnError
   const ecnFromControl = this.newEcnForm.get('ecnNo');
   ecnFromControl.valueChanges.debounceTime(1000).subscribe((value)=>
          this.setEcnErrorMessage(ecnFromControl) 
         );

  //Set Error messages for priorityErrors
    const priorityFormControl = this.newEcnForm.get('priority');
    priorityFormControl.valueChanges.debounceTime(1000).subscribe(value=>
    this.setPriorityErrorMessages(priorityFormControl)
    );
       

         //Read ecn id from route parameters
        this.sub = this._route.params.subscribe(
          params=>{
            let id = +params['id'];
            this.getEcn(id);          
          });
          
 
  
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

  ngOnDestroy(): void{
    this.sub.unsubscribe;
  }

}
