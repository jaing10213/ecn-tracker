import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.css']
})
export class ToggleSwitchComponent implements OnInit {

  constructor() { }

private _label;

checked: boolean

@Input() 
set label(label: string) {
    this._label = label;
  }

  get label(): string { return this._label; }


@Output() notifyOn: EventEmitter<boolean> = new EventEmitter<boolean>();

 clicked() {
  this.notifyOn.emit(this.checked);
}

  ngOnInit() {
  }

}
