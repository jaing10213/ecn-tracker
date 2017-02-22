import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

 import {Iecn} from './Iecn';
@Component({
    templateUrl: './ecn-details.component.html'
})
export class EcnDetailsComponent{

constructor(private _route: ActivatedRoute, private _router: Router){

}

title: string = "ECN Details";
ecn: Iecn;


ngOnInit(): void{
    
    let id = this._route.snapshot.params['id'];
  this.title = id.toString();
}

onBack(): void{
    this._router.navigate(['/ecns'])
}

}
