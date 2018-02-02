import { Component, OnInit, Output, Input, AfterViewInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.css']
})
export class ToggleSwitchComponent implements OnInit, AfterViewInit {

  constructor() { }

@Input() labelLeft 
@Input() labelRight

@Input() checked: boolean = false;
//Output property is same name as input but with a suffix of "Change"
@Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

 clicked(value) {
 //  this.checked = !this.checked;
 this.checked = value
  this.checkedChange.emit(this.checked);
}

  ngOnInit() {
 console.log("SwitchOnInit: " + this.checked)
    
  }

  ngAfterViewInit(){
  }


}
