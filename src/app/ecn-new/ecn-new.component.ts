import { Component, OnInit } from '@angular/core';
import {Iecn} from '../ecn/Iecn'

@Component({
  selector: 'ecn-new',
  templateUrl: './ecn-new.component.html',
  styleUrls: ['./ecn-new.component.css']
})
export class EcnNewComponent implements OnInit {

  constructor() { }

  ecn: Iecn

  ngOnInit() {
    this.ecn =  {ecnNo: "E123456", description: "typical ecn", status: "CCB", priority: 1, resource: "Gaurav", comments: ["Nothing"]};
  }

}
