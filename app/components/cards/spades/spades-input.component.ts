import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Cell} from '../../../models/cell';

@Component({
  moduleId: module.id,
  selector: 'my-spades-input',
  templateUrl: 'spades-input.component.html',
  styleUrls: ['spades-input.component.css']
})
export class SpadesInputComponent implements OnInit {
  ngOnInit(): void {
  }

  selected(value:string) {
    console.log(value);
    this.isVisible = false;
    this.notify.emit(value);
  }

  cancel() {
    this.isVisible = false;
  }

  public isBid: boolean;
  public isVisible: boolean;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  showDialog(isBid: boolean) {
    this.isVisible = true;
    this.isBid = isBid;
  }

  hideHide() {
    this.isVisible = false;
  }
}
