import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControlName, FormGroup, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css']
})
export class ToggleButtonComponent implements OnInit {
//  appIDType: Array<String>=[];
appIDType: Array<String>=[];

 @Output() passedEvent = new EventEmitter();
 form!: FormGroup
  constructor(private rootFormGroup: FormGroupDirective) { }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
//   this.form = new FormGroup({
//     appIDType: new FormControl()
//  });
  }

  onToggleButtonChange(eventData: Array<String> ){
    console.log(eventData);
    this.passedEvent.emit(eventData);
  }

}
