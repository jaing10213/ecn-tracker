import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ok-cancel',
  templateUrl: './ok-cancel.component.html',
  styleUrls: ['./ok-cancel.component.css']
})
export class OkCancelComponent implements OnInit {

  constructor() { }

  @Output() notifyOk: EventEmitter<null> = new EventEmitter<null>()
  @Output() notifyCancel: EventEmitter<null> = new EventEmitter<null>()


  ok(): void{
    this.notifyOk.emit();
  }

  cancel(): void{
    this.notifyCancel.emit();
  }

  ngOnInit() {
  }

}
