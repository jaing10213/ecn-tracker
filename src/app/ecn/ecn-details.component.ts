import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

 import {Iecn} from './Iecn';
 import {EcnService} from '../Services/ecn-list.service';
@Component({
    templateUrl: './ecn-details.component.html'
})
export class EcnDetailsComponent{

constructor(private _route: ActivatedRoute, private _router: Router, 
private _ecnService: EcnService){

}

title: string = "ECN Details";
ecn: Iecn;
inpType: boolean = false;
inpValue: string = '';

ngOnInit(): void{
    
    let id = this._route.snapshot.params['id'];
let  res = this._ecnService.getEcn(id);
//if res is not null then only access status property
this.title = res?res.status:'';

this.inpValue = res?res.ecnNo:'';

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
