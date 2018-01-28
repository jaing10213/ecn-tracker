import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.css']
})
export class ToggleSwitchComponent implements OnInit {

  constructor() { }

private _label;


@Input() 
set label(label: string) {
    this._label = label;
  }

  get label(): string { return this._label; }

@Input() checked: boolean = false;
//Output property is same name as input but with a suffix of "Change"
@Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

 clicked() {
  this.checkedChange.emit(this.checked);
}

  ngOnInit() {
  }

}
