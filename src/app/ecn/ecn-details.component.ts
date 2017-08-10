import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

 import {Iecn} from '../Objects/Iecn';
 import {EcnService} from '../Services/ecnService';
@Component({
    templateUrl: './ecn-details.component.html'
})
export class EcnDetailsComponent{

constructor(private _route: ActivatedRoute, 
private _router: Router, 
private _ecnService: EcnService){

}

title: string = "ECN Details";
ecn: Iecn;
inpType: boolean = false;
inpValue: string = '';

private assignEcn(ecn: Iecn){
//if res is not null then only access status property
this.title = ecn?ecn.status:'';

this.inpValue = ecn?ecn.ecnNo:'';

}

ngOnInit(): void{
    
    let id = this._route.snapshot.params['id'];
    let  res = this._ecnService.getEcn(id).subscribe(data=> this.assignEcn(data));

}

onSubmit(): void{
    this.inpType = !this.inpType;
}

onClick(): void{
    this.inpType= !this.inpType;
}

onBack(): void{
    this._router.navigate(['/ecns'])
}

}
