import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { EcnService } from '../Services/ecnService';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Iecn } from '../Objects/Iecn';
import * as moment from 'moment'

import 'rxjs/add/operator/debounceTime';


function priorityRange(c: AbstractControl): { [key: string]: boolean } | null {

  if (c.value != undefined && (isNaN(c.value) || c.value < 1 || c.value > 10)) {

    return { 'range': true };
  };

  return null;
}

//Set error messages for priorityRange using passed in min and max values
function PriorityRangeWithParameters(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [Key: string]: boolean } | null => {
    if ((c.valid != undefined) && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true };
    }
    else {
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
  isEcnValid: boolean = false;
  sub: Subscription;
  errorMsg: string;
  ecn: Iecn;
  pId: number = 0;
  uId: number = 0;
  blnEcnSaved: boolean = false;
  blnEcnLoaded: boolean = false;
  blnEcnSaving: boolean = false;
  userList: { Key: number, Value: string }[];
  projectList: { Key: number, Value: string }[];
  statusList: { Key: number, Value: string }[];

  constructor(private _fb: FormBuilder,
    private _ecnService: EcnService,
    private _route: ActivatedRoute,
    private _router: Router) {
  }

  private ecnValidationMessages = {
    minlength: 'ECN No. should be a min. of 7 characters',
    required: 'ECN No. is required',
    pattern: 'ECN No. should be alpha-numeric'
  }

  ecnErrorMessage: string[];
  private setEcnErrorMessage(c: AbstractControl): void {

    this.ecnErrorMessage = null;

    if ((c.dirty || c.touched) && c.errors) {
      this.ecnErrorMessage = Object.keys(c.errors).map(
        key => this.ecnValidationMessages[key]);
    }

    this.isEcnValid = false;

    if (c.dirty && c.valid) {
      this.isEcnValid = true;
    }

  }


  priorityErrorMessage: string[];
  isPriorityValid: boolean = false;

  private priorityValidationMessages = {
    'range': 'Priority should be within 0 an 10',
  }

  private setPriorityErrorMessages(c: AbstractControl) {

    this.priorityErrorMessage = null;

    if (c.errors != null) {

    }
    if ((c.dirty || c.touched) && c.errors) {

      this.priorityErrorMessage = Object.keys(c.errors).map(key =>
        this.priorityValidationMessages[key]);

    }
    this.isPriorityValid = false;
    if (c.dirty && c.valid) {
      this.isPriorityValid = true;
    }


  };

  private getEcn(id: number) {
    this._ecnService.getEcn(id).subscribe(
      (ecn) => this.onReceivingEcn(ecn),
      (error: any) => this.errorMsg = <any>error
    );
  }

  private onReceivingEcn(ecn: Iecn) {
    //Reset form
   
      this.blnEcnLoaded = true;
     // setTimeout(()=>{this.blnEcnLoaded=false},1500);
      if (this.newEcnForm) {
        this.newEcnForm.reset();
      }

      //Assign value to the Ecn property
      this.ecn = ecn;


      //Update data on the form
      this.userList = ecn.userList;
      this.projectList = ecn.projectList;
      this.statusList = ecn.statusList;

     // console.log("Date: " + this.ecn.statusDate.toLocaleDateString());
      this.newEcnForm.patchValue(
        {
          ecnNo: this.ecn.ecnNo,
          currentWorkerId: this.ecn.currentWorkerId,
          originatorId: (this.ecn.originatorId!=0)?this.ecn.originatorId:1,
          projectId: (this.ecn.projectId!=0)?this.ecn.projectId:1,
          statusId: (this.ecn.statusId !=0)?this.ecn.statusId:1,
          priority: this.ecn.priority,
          //For new Form, the statusDate comes as 1001-01-01. Need to change to current date
          statusDate: moment(this.ecn.statusDate).isAfter(moment('2000-01-01'))? moment(this.ecn.statusDate).format('L'): moment(new Date()).format('L'),
          startDate: (this.ecn.startDate)? moment(this.ecn.startDate).format('L'): null,
          endDate: (this.ecn.endDate)? moment(this.ecn.endDate).format('L'): null,
          title: this.ecn.title,
          description: this.ecn.description,
          tags: this.ecn.tags,
          isTask: this.ecn.isTask,
          blnBuyPart: this.ecn.blnBuyPart,
          notiSentDate: (this.ecn.notiSentDate)? moment(this.ecn.notiSentDate).format('L'): null,
          notiRecDate: (this.ecn.notiRecDate)? moment(this.ecn.notiRecDate).format('L'): null,
          
        }
      )
       
    
  }


  saveEcn(): void {
      this.blnEcnSaved = false;    
      this.errorMsg = null;
    if ((this.newEcnForm.dirty) && (this.newEcnForm.valid)) {
      //copy form values over the ecn obejct values and return as a new Iecn object
      let e = Object.assign({}, this.ecn, this.newEcnForm.value) as Iecn;
      e.userList = null;
      e.projectList = null;
      e.statusList = null;
      e.statusDate = moment(e.statusDate).toDate();
      e.startDate = moment(e.startDate).toDate();
      e.endDate = moment(e.endDate).toDate();
      e.notiSentDate = moment(e.notiSentDate).toDate();
      e.notiRecDate = moment(e.notiRecDate).toDate();

      this.blnEcnSaving = true;
      this._ecnService.saveEcn(e)
        .subscribe(
        (ecn) => this.onSaveComplete(),
        (error: any) => this.onSaveError(error));

    }

  }

private onSaveError(error: any): void{
      this.blnEcnSaved = true;
      this.errorMsg = error
      this.blnEcnSaving = false;
}
  private onSaveComplete(): void {
      this.blnEcnSaved = true;
      this.blnEcnSaving = false;
     // setTimeout(()=>{this.blnEcnSaved=false},2000);
    //  this.newEcnForm.reset();
    
  }

  ngOnInit() {


    //Instantiate the new form
    this.newEcnForm = this._fb.group({
      ecnNo: ['', [Validators.required, Validators.minLength(7), Validators.pattern('[a-zA-Z0-9]+')]],
      currentWorkerId: '',
      originatorId: '',
      projectId: '',
      statusId: '',
      statusDate: ['',Validators.required],
      startDate: '',
      endDate: '',
      tags: '',
      title: ['',Validators.required],
      description: '',
      priority: [1, PriorityRangeWithParameters(1, 20)],
      isTask: [false],
      blnBuyPart: [false],
      notiSentDate: '',
      notiRecDate: ''
    })

    //Set error messages for EcnError
    const ecnFromControl = this.newEcnForm.get('ecnNo');
    ecnFromControl.valueChanges.debounceTime(1000).subscribe((value) =>
      this.setEcnErrorMessage(ecnFromControl)
    );

    //Set Error messages for priorityErrors
    const priorityFormControl = this.newEcnForm.get('priority');
    priorityFormControl.valueChanges.debounceTime(1000).subscribe(value =>
      this.setPriorityErrorMessages(priorityFormControl)
    );


    //Read ecn id from route parameters and get corresponding ECN from database 
    this.sub = this._route.params.subscribe(
      params => {
        this.pId = +params['pId'];
        this.uId = +params['uId'];
        let id = +params['id'];
        this.getEcn(id);
      });



    // this.newEcnForm.valueChanges.subscribe(value=> console.log(JSON.stringify(value)));

    //initialize form control properties (don't need this. instead use FormBuilder)

   
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }

}
